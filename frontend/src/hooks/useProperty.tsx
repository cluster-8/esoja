import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { FieldValues } from 'react-hook-form';
import { Alert } from 'react-native';
import { Property } from '../data/Model/Property';
import { api } from '../data/services/api';

interface PropertyContextData {
  createPorperty: (data: FieldValues) => Promise<void>;
  getProperties: (query?: string) => Promise<Property[]>;
}

type PropertyContextProps = {
  children: ReactNode;
};

const PropertyContext = createContext({} as PropertyContextData);

const PropertyProvider: React.FC<PropertyContextProps> = ({ children }) => {
  const createPorperty = useCallback(async (data: FieldValues) => {
    try {
      await api.post('/property', data);
    } catch (err: any) {
      Alert.alert('erro');
    }
  }, []);

  const getProperties = useCallback(async (query = '') => {
    try {
      const { data } = await api.get<Property[]>(`/property${query}`);
      return data;
    } catch (err: any) {
      Alert.alert(err.response.data.message || err.response.data.message[0]);
      return [];
    }
  }, []);
  const providerValue = useMemo(
    () => ({
      createPorperty,
      getProperties
    }),
    [createPorperty, getProperties]
  );
  return (
    <PropertyContext.Provider value={providerValue}>
      {children}
    </PropertyContext.Provider>
  );
};

const useProperty = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    throw new Error('useProperty must be used within an PropertyProvider');
  }

  return context;
};

export { useProperty, PropertyProvider };
