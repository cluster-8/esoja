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
import { Alert } from 'react-native';
import { ApiError } from '../data/Model/Error';
import { api } from '../data/services/api';
import { useUpload } from './useUpload';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Sample {
  areaTotal?: number;
  cultiveCoordinates?: Coordinates[];
  name?: string;
  description?: string;
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
  cropYear?: string;
  plantingDate?: string;
  propertyId?: string;
  status?: 'pending' | 'inProduction' | 'finished';
}

interface SampleContextData {
  saveStep: (data: FieldValues) => Promise<void>;
  saveLocale: (polygon: Coordinates[], areaTotal: number) => void;
  getPersistedData: () => Promise<Sample | null>;
  getPlot: () => Promise<any[]>;
  createPlot: () => Promise<any>;
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

  const saveLocale = useCallback(
    (cultiveCoordinates: Coordinates[], areaTotal: number) => {
      setSample(prev => ({ ...prev, cultiveCoordinates, areaTotal }));
      persistData({ ...sample, cultiveCoordinates, areaTotal });
    },
    [sample]
  );

  const saveStep = useCallback(
    async (data: FieldValues) => {
      setSample(prev => ({ ...prev, ...data }));
      await persistData({ ...sample, ...data });
    },
    [sample]
  );

  const createPlot = useCallback(async () => {
    let cultiveId;
    try {
      const fullData: Sample = await getPersistedData();
      if (fullData && fullData?.photo) {
        const a = await api.post<{ id: string }>('/cultive', {});

        fullData.photo = await pictureUpload(fullData.photo, 'sample');
        const newCultive = {
          propertyId: fullData?.propertyId,
          cultiveCoordinates: fullData?.cultiveCoordinates,
          cropYear: fullData?.cropYear,
          plantingDate: fullData?.plantingDate,
          areaTotal: fullData?.areaTotal,
          plantsPerMeter: fullData?.plantsPerMeter,
          metersBetweenPlants: fullData?.metersBetweenPlants,
          status: 'pending',
          description: fullData?.description,
          photo: fullData?.photo
        };
        const { data } = await api.post<{ id: string }>('/cultive', newCultive);
        cultiveId = data?.id;
        const newSample = {
          cultiveId,
          samples: [
            { ...fullData?.plantA, name: 'Amostra 1' },
            { ...fullData?.plantB, name: 'Amostra 2' },
            { ...fullData?.plantC, name: 'Amostra 3' }
          ]
        };
        console.log(newSample);

        await api.post('/sample', newSample);
      }
      throw new Error('cade a foto fio');
    } catch (err: ApiError) {
      if (cultiveId) {
        await api.delete(`/cultive/${cultiveId}`);
      }
      console.log(err?.response?.data?.message[0]);
      // throw new Error(err.response.data.message);
    }
  }, [getPersistedData, pictureUpload]);

  const getPlot = useCallback(async () => {
    try {
      const { data } = await api.get<any[]>('/cultive');
      return data;
    } catch (err) {
      Alert.alert('erro');
      return [];
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      saveStep,
      getPersistedData,
      saveLocale,
      getPlot,
      createPlot
    }),
    [saveStep, getPersistedData, saveLocale, getPlot, createPlot]
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
