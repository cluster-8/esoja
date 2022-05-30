import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { api } from '../data/services/api';
import { getWeatherDay } from '../data/services/weather.services';

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
}

type HomeContextProps = {
  children: ReactNode;
};

const HomeContext = createContext({} as HomeContextData);

const HomeProvider: React.FC<HomeContextProps> = ({ children }) => {
  const getWeatherCurrentDay = useCallback(
    async (coordinates: Coordinates): Promise<WeatherResponseProps> => {
      return getWeatherDay(coordinates);
    },
    []
  );

  const getQuotation = useCallback(async () => {
    try {
      const { data } = await api.get<QuotationResponse>('/imea/main');
      return data;
    } catch (err) {
      throw new Error('erro');
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      getWeatherCurrentDay,
      getQuotation
    }),
    [getWeatherCurrentDay, getQuotation]
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
