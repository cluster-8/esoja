import { Query, QueryString } from 'nestjs-prisma-querybuilder-interface';
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
  getProperties: (query: Query) => Promise<Property[]>;
  getProperty: (propertyId: string, query: Query) => Promise<Property>;
  deleteProperty:(id:string) => Promise<any>;
}

type PropertyContextProps = {
  children: ReactNode;
};

const PropertyContext = createContext({} as PropertyContextData);

const PropertyProvider: React.FC<PropertyContextProps> = ({ children }) => {
  const createPorperty = useCallback(async (data: FieldValues) => {
    await api.post('/property', data);
  }, []);

  const getProperties = useCallback(async (query: Query) => {
    try {
      const { data } = await api.get<Property[]>(`/property`, {
        params: query,
        paramsSerializer: params => QueryString(params)
      });
      return data;
    } catch (err: any) {
      Alert.alert(err.response.data.message || err.response.data.message[0]);
      return [];
    }
  }, []);

  const getProperty = useCallback(async (propertyId: string, query: Query) => {
    const { data } = await api.get<Property>(`/property/${propertyId}`, {
      params: query,
      paramsSerializer: params => QueryString(params)
    });
    return data;
  }, []);

  const deleteProperty = async (id:string)=>{
    const res = await api.delete('/property/'+id)
    return res;
  }

  const providerValue = useMemo(
    () => ({
      createPorperty,
      getProperties,
      getProperty,
      deleteProperty
    }),
    [createPorperty, getProperties, getProperty]
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
