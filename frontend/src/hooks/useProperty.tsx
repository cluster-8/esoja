import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { FieldValues } from 'react-hook-form';
import { Alert } from 'react-native';
import { api } from '../data/services/api';

interface PropertyContextData {
  createPorperty: (data: FieldValues) => Promise<void>;
  getProperties: () => Promise<any[]>;
}

type PropertyContextProps = {
  children: ReactNode;
};

const PropertyContext = createContext({} as PropertyContextData);

const PropertyProvider: React.FC<PropertyContextProps> = ({ children }) => {
  const createPorperty = useCallback(async (data: FieldValues) => {
    try {
      await api.post('/property', data);
    } catch (err) {
      Alert.alert('erro');
    }
  }, []);

  const getProperties = useCallback(async () => {
    try {
      const { data } = await api.get<any[]>('/property');
      return data;
    } catch (err) {
      Alert.alert('erro');
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
