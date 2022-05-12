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
import { api } from '../data/services/api';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Sample {
  poligon?: Coordinates[];
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
}

interface SampleContextData {
  saveStep: (data: FieldValues) => void;
  saveLocale: (data: Coordinates[]) => void;
  getPersistedData: () => Promise<Sample | null>;
  getPlot: () => Promise<any[]>;
}

type SampleContextProps = {
  children: ReactNode;
};

const SampleContext = createContext({} as SampleContextData);

const SampleProvider: React.FC<SampleContextProps> = ({ children }) => {
  const [sample, setSample] = useState<Sample | null>(null);

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
    (data: Coordinates[]) => {
      setSample(prev => ({ ...prev, poligon: data }));
      persistData({ ...sample, poligon: data });
    },
    [sample]
  );

  const saveStep = useCallback(
    (data: FieldValues) => {
      setSample(prev => ({ ...prev, ...data }));
      persistData({ ...sample, ...data });
    },
    [sample]
  );

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
      getPlot
    }),
    [saveStep, getPersistedData, saveLocale, getPlot]
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
