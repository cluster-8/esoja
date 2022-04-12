import React, { createContext, ReactNode, useContext, useMemo } from "react";

import axios from "axios";

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
  getWeatherCurrentDay: () => Promise<WeatherResponseProps | undefined>;
  getQuotation: () => Promise<Quotation[] | undefined>;
}

type HomeContextProps = {
  children: ReactNode;
};

const HomeContext = createContext({} as HomeContextData);

const HomeProvider: React.FC<HomeContextProps> = ({ children }) => {
  const getWeatherCurrentDay = async () => {
    try {
      const { data } = await axios.get<WeatherResponseProps>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${-23.24}&lon=${-45.89}&appid=9e4568d2f08dd1b31425e87801aa303d&units=metric`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getQuotation = async () => {
    try {
      const { data } = await axios.get<Quotation[]>(
        `https://api1.imea.com.br/api/v2/mobile/cadeias/4/cotacoes`
      );
      const availableQuote = data.filter(
        (quotation) =>
          quotation.IndicadorFinalId === "708192508838936580" &&
          quotation.Localidade === "Mato Grosso"
      );
      const seedQuote = data.filter(
        (quotation) =>
          quotation.Localidade === "Convencional" &&
          quotation.UnidadeSigla === "R$/sc"
      );
      return [availableQuote[0], seedQuote[0]];
    } catch (err) {
      console.log(err);
    }
  };

  const providerValue = useMemo(
    () => ({
      getWeatherCurrentDay,
      getQuotation,
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
    throw new Error("useHome must be used within an HomeProvider");
  }

  return context;
};

export { useHome, HomeProvider };
