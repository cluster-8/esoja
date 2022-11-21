import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { api } from '../data/services/api';
import { getWeatherDay } from '../data/services/weather.services';
import { useAuth } from './useAuth';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherResponseProps {
  main: {
    temp: number;
  };
  weather: [
    {
      icon: string;
    }
  ];
}

export interface Quotation {
  Variacao: number;
  Valor: number;
  DataPublicacao: string;
  UnidadeSigla: string;
}

export interface QuotationResponse {
  availableSoybeanPack: Quotation;
  conventionalSeed: Quotation;
}

interface HomeContextData {
  getWeatherCurrentDay: (
    coordinates: Coordinates
  ) => Promise<WeatherResponseProps>;
  getQuotation: () => Promise<QuotationResponse>;
  getHistoryQuotation: () => Promise<QuotationResponse[]>;
}

type HomeContextProps = {
  children: ReactNode;
};

const HomeContext = createContext({} as HomeContextData);

const HomeProvider: React.FC<HomeContextProps> = ({ children }) => {
  const { isConnected } = useAuth();
  const getWeatherCurrentDay = useCallback(
    async (coordinates: Coordinates): Promise<WeatherResponseProps> => {
      if (!isConnected) {
        const data: any = await AsyncStorage.getItem('@esoja:getWeatherDay');
        return JSON.parse(data);
      }

      const data = await getWeatherDay(coordinates);
      await AsyncStorage.setItem('@esoja:getWeatherDay', JSON.stringify(data));
      return data;
    },
    [isConnected]
  );

  const getQuotation = useCallback(async () => {
    if (!isConnected) {
      const data: any = await AsyncStorage.getItem('@esoja:getQuotation');
      return JSON.parse(data);
    }

    try {
      const { data } = await api.get<QuotationResponse>('/imea/main');
      await AsyncStorage.setItem('@esoja:getQuotation', JSON.stringify(data));

      return data;
    } catch (err) {
      throw new Error('erro');
    }
  }, [isConnected]);

  const getHistoryQuotation = useCallback(async () => {
    try {
      if (!isConnected) {
        const data: any = await AsyncStorage.getItem(
          '@esoja:getHistoryQuotation'
        );
        return JSON.parse(data);
      }
      const { data } = await api.get<QuotationResponse[]>(`/imea/dashboard`);
      await AsyncStorage.setItem(
        '@esoja:getHistoryQuotation',
        JSON.stringify(data)
      );
      return data;
    } catch (err: any) {
      throw new Error(
        err.response.data.message || err.response.data.message[0]
      );
    }
  }, [isConnected]);

  const providerValue = useMemo(
    () => ({
      getWeatherCurrentDay,
      getQuotation,
      getHistoryQuotation
    }),
    [getWeatherCurrentDay, getQuotation, getHistoryQuotation]
  );
  return (
    <HomeContext.Provider value={providerValue}>
      {children}
    </HomeContext.Provider>
  );
};

const useHome = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within an HomeProvider');
  }

  return context;
};

export { useHome, HomeProvider };
