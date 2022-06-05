import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import { api } from '../data/services/api';

export interface Produtividade {
  data: {
    produtividadeAlmejada: number[];
    produtividadeMediaMunicipio: number[];
    temperaturaMinima: number[];
    temperaturaMaxima: number[];
    precipitacao: number[];
    grausDia: number[];
    balancoHidrico: number[];
    deficienciaHidrica: number[];
    excedenteHidrico: number[];
  };
}

interface CultivarResponse {
  idCultivar: number;
  numeroRnc: string;
}

interface StatisticsContextData {
  getProduction: (
    cultiveId: string,
    idCultivar: number
  ) => Promise<Produtividade>;
  getObtentores: (cultiveId: string) => Promise<string[]>;
  getCultivares: (
    cultiveId: string,
    obtentorMantenedor: string
  ) => Promise<CultivarResponse[]>;
}

type StatisticsContextProps = {
  children: ReactNode;
};

const StatisticsContext = createContext({} as StatisticsContextData);

const StatisticsProvider: React.FC<StatisticsContextProps> = ({ children }) => {
  const getProduction = useCallback(
    async (cultiveId: string, idCultivar: number) => {
      const { data } = await api.post<Produtividade>('agritec/produtividade', {
        cultiveId,
        idCultivar
      });
      return data;
    },
    []
  );
  const getObtentores = useCallback(async (cultiveId: string) => {
    const { data } = await api.post<string[]>('agritec/obtentores', {
      cultiveId
    });
    return data;
  }, []);

  const getCultivares = useCallback(
    async (cultiveId: string, obtentorMantenedor: string) => {
      const { data } = await api.post<CultivarResponse[]>(
        'agritec/cultivares',
        {
          cultiveId,
          obtentorMantenedor
        }
      );
      return data;
    },
    []
  );

  const providerValue = useMemo(
    () => ({ getProduction, getObtentores, getCultivares }),
    [getProduction, getObtentores, getCultivares]
  );

  return (
    <StatisticsContext.Provider value={providerValue}>
      {children}
    </StatisticsContext.Provider>
  );
};

const useStatistics = () => {
  const context = useContext(StatisticsContext);

  if (!context) {
    throw new Error('useStatistics must be used within an StatisticsProvider');
  }

  return context;
};

export { useStatistics, StatisticsProvider };
