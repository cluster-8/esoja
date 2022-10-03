import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { FieldValues } from 'react-hook-form';
import { api, api2 } from '../data/services/api';
import { useUpload } from './useUpload';

interface Sample {
  metersBetweenPlants?: string;
  plantsPerMeter?: string;
  plantA?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  plantB?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  plantC?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  photo?: string;
  cultiveId?: string;
}

interface SampleContextData {
  saveStep: (data: FieldValues) => Promise<void>;
  getPersistedData: () => Promise<Sample | null>;
  createSample: (photoUri: string) => Promise<any>;
  getGrainsEstimation:()=>Promise<any>;
}

type SampleContextProps = {
  children: ReactNode;
};

const SampleContext = createContext({} as SampleContextData);

const SampleProvider: React.FC<SampleContextProps> = ({ children }) => {
  const [sample, setSample] = useState<Sample | null>(null);
  const { pictureUpload } = useUpload();

  const persistData = async (data: Sample) => {
    await AsyncStorage.setItem('@esoja:sample', JSON.stringify(data));
  };

  const removeData = async () => {
    await AsyncStorage.removeItem('@esoja:sample');
  };

  const getPersistedData = useCallback(async () => {
    if (sample) {
      return sample;
    }
    const data = await AsyncStorage.getItem('@esoja:sample');
    if (data) {
      setSample(JSON.parse(data));
      return JSON.parse(data);
    }
    return null;
  }, [sample]);

  const saveStep = useCallback(
    async (data: FieldValues) => {
      setSample(prev => ({ ...prev, ...data }));
      await persistData({ ...sample, ...data });
    },
    [sample]
  );

  const createSample = useCallback(
    async (photoUri: string) => {
      const fullData: Sample = await getPersistedData();
      fullData.photo = await pictureUpload(photoUri, 'sample');
      const updatePlot = {
        plantsPerMeter: fullData?.plantsPerMeter,
        metersBetweenPlants: (Number(fullData?.metersBetweenPlants) || 0) / 100,
        photo: fullData?.photo
      };
      await api.put(
        `/cultive/sample-information/${fullData?.cultiveId}`,
        updatePlot
      );
      const newSample = {
        cultiveId: fullData?.cultiveId,
        samples: [
          { ...fullData?.plantA, name: 'Amostra 1' },
          { ...fullData?.plantB, name: 'Amostra 2' },
          { ...fullData?.plantC, name: 'Amostra 3' }
        ]
      };
      await api.post('/sample', newSample);
      removeData();
    },
    [getPersistedData, pictureUpload]
  );

  const getGrainsEstimation = useCallback(
    async ()=>{
        // const fullData: Sample = await getPersistedData();
        // const grains = await api2.get(`/getGrains/${fullData?.cultiveId}`)
        const grains = await api2.get(`/getGrains/${2}`)
        return grains.data;
    },[]
  )

  const providerValue = useMemo(
    () => ({
      saveStep,
      getPersistedData,
      createSample,
      getGrainsEstimation
    }),
    [saveStep, getPersistedData, createSample,getGrainsEstimation]
  );
  return (
    <SampleContext.Provider value={providerValue}>
      {children}
    </SampleContext.Provider>
  );
};

const useSample = () => {
  const context = useContext(SampleContext);

  if (!context) {
    throw new Error('useSample must be used within an SampleProvider');
  }

  return context;
};

export { useSample, SampleProvider };
