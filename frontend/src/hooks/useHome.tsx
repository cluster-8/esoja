import axios from 'axios';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
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
      main: string;
      description: string;
      icon: string;
    }
  ];
}

export interface Quotation {
  Localidade: string;
  Variacao: number;
  Valor: number;
  Safra: any;
  IndicadorFinalId: string;
  CadeiaId: number;
  DataPublicacao: string;
  TipoLocalidadeId: string;
  UnidadeSigla: string;
  UnidadeDescricao: string;
}

interface HomeContextData {
  getWeatherCurrentDay: (
    coordinates: Coordinates
  ) => Promise<WeatherResponseProps | undefined>;
  getQuotation: () => Promise<Quotation[] | undefined>;
}

type HomeContextProps = {
  children: ReactNode;
};

const HomeContext = createContext({} as HomeContextData);

const HomeProvider: React.FC<HomeContextProps> = ({ children }) => {
  const getWeatherCurrentDay = useCallback(async (coordinates: Coordinates) => {
    return getWeatherDay(coordinates);
  }, []);

  const getQuotation = useCallback(async () => {
    try {
      const { data } = await axios.get<Quotation[]>(
        `${process.env.IMEA_ROUTE}`
      );
      const availableQuote = data.filter(
        quotation =>
          quotation.IndicadorFinalId === '708192508838936580' &&
          quotation.Localidade === 'Mato Grosso'
      );
      const seedQuote = data.filter(
        quotation =>
          quotation.Localidade === 'Convencional' &&
          quotation.UnidadeSigla === 'R$/sc'
      );
      return [availableQuote[0], seedQuote[0]];
    } catch (err) {
      return undefined;
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
