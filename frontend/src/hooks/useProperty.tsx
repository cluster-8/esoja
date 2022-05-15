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

export interface Property {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
}

interface PropertyContextData {
  createPorperty: (data: FieldValues) => Promise<void>;
  getProperties: (query?: string) => Promise<any[]>;
  propertySelected: Property;
  setPropertySelected: (property: Property) => any;
}

type PropertyContextProps = {
  children: ReactNode;
};

const PropertyContext = createContext({} as PropertyContextData);

const PropertyProvider: React.FC<PropertyContextProps> = ({ children }) => {
  const [propertySelected, setPropertySelected] = useState<Property | any>();

  const createPorperty = useCallback(async (data: FieldValues) => {
    try {
      await api.post('/property', data);
    } catch (err) {
      Alert.alert('erro');
    }
  }, []);

  const getProperties = useCallback(async (query = '') => {
    try {
      const { data } = await api.get<any[]>(`/property${query}`);
      return data;
    } catch (err) {
      Alert.alert('erro');
      return [];
    }
  }, []);
  const providerValue = useMemo(
    () => ({
      createPorperty,
      getProperties,
      propertySelected,
      setPropertySelected
    }),
    [createPorperty, getProperties, propertySelected, setPropertySelected]
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
