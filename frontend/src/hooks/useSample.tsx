import AsyncStorage from '@react-native-async-storage/async-storage';
import { Query, QueryString } from 'nestjs-prisma-querybuilder-interface';
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
import { Plot } from '../data/Model/Plot';
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
  getPlot: (query: Query) => Promise<Plot[]>;
  createPlot: () => Promise<void>;
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
        await api.post<{ id: string }>('/cultive', {});
        fullData.photo = await pictureUpload(fullData.photo, 'sample');
        const newPlot = {
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
        const { data } = await api.post<{ id: string }>('/cultive', newPlot);
        cultiveId = data?.id;
        const newSample = {
          cultiveId,
          samples: [
            { ...fullData?.plantA, name: 'Amostra 1' },
            { ...fullData?.plantB, name: 'Amostra 2' },
            { ...fullData?.plantC, name: 'Amostra 3' }
          ]
        };
        await api.post('/sample', newSample);
      }
      throw new Error('cade a foto fio');
    } catch (err: any) {
      if (cultiveId) {
        await api.delete(`/cultive/${cultiveId}`);
      }
      throw new Error(
        err.response.data.message || err.response.data.message[0]
      );
    }
  }, [getPersistedData, pictureUpload]);

  const getPlot = useCallback(async query => {
    try {
      const { data } = await api.get<Plot[]>(`/cultive`, {
        params: query,
        paramsSerializer: params => QueryString(params)
      });
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
