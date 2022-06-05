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

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface PlotLocale {
  areaTotal?: number;
  cultiveCoordinates?: Coordinates[];
}

interface PlotContextData {
  localeStep: (polygon: Coordinates[], areaTotal: number) => void;
  getPlots: (query: Query) => Promise<Plot[]>;
  getPlot: (id: string) => Promise<Plot>;
  createPlot: (data: FieldValues) => Promise<{ id: string }>;
  getAverageProductivity: (cultiveId: string) => Promise<{ avarege: number }>;
}

type PlotContextProps = {
  children: ReactNode;
};

const PlotContext = createContext({} as PlotContextData);

const PlotProvider: React.FC<PlotContextProps> = ({ children }) => {
  const [plotLocale, setPlotLocale] = useState<PlotLocale>({} as PlotLocale);

  const localeStep = useCallback(
    (cultiveCoordinates: Coordinates[], areaTotal: number) => {
      setPlotLocale({ cultiveCoordinates, areaTotal });
    },
    []
  );

  const createPlot = useCallback(
    async (data: FieldValues) => {
      const newPlot = {
        ...data,
        cultiveCoordinates: plotLocale?.cultiveCoordinates,
        areaTotal: plotLocale.areaTotal,
        status: 'pending'
      };
      const { data: res } = await api.post<{ id: string }>('/cultive', newPlot);
      return res;
    },
    [plotLocale]
  );

  const getPlots = useCallback(async query => {
    try {
      const { data } = await api.get<Plot[]>(`/cultive`, {
        params: query,
        paramsSerializer: params => QueryString(params)
      });
      return data;
    } catch (err: any) {
      Alert.alert(err.response.data.message || err.response.data.message[0]);
      return [];
    }
  }, []);

  const getPlot = useCallback(async (id: string) => {
    try {
      const { data } = await api.get<Plot>(`/cultive/${id}`);
      return data;
    } catch (err: any) {
      Alert.alert(err.response.data.message || err.response.data.message[0]);
      return {} as Plot;
    }
  }, []);

  const getAverageProductivity = useCallback(async (cultiveId: string) => {
    const { data } = await api.get<{ avarege: number }>(
      `/cultive/productivity/${cultiveId}`
    );
    return data;
  }, []);

  const providerValue = useMemo(
    () => ({
      localeStep,
      getPlots,
      getPlot,
      createPlot,
      getAverageProductivity
    }),
    [localeStep, getPlots, getPlot, createPlot, getAverageProductivity]
  );

  return (
    <PlotContext.Provider value={providerValue}>
      {children}
    </PlotContext.Provider>
  );
};

const usePlot = () => {
  const context = useContext(PlotContext);

  if (!context) {
    throw new Error('usePlot must be used within an PlotProvider');
  }

  return context;
};

export { usePlot, PlotProvider };
