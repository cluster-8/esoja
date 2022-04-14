import React, { useEffect, useState } from "react";
import { MenuCard } from "../../components/MenuCard";
import { UserCard } from "../../components/UserCard";

import { translate } from "../../data/I18n";
import { HomeScreenRouteProps } from "../../data/routes/app";
import { Quotation, useHome, WeatherResponseProps } from "../../hooks/useHome";
import { useLocation } from "../../hooks/useLocation";
import { getWeatherImage } from "../../utils/getWeatherImage";
import {
  HomeContainer,
  HomeMenuCardWidgetContainer,
  HomeMenuContainer,
  HomeMenuContentContainer,
  MenuCardContainer,
} from "./styles";

export const Home: React.FC<HomeScreenRouteProps> = ({ navigation }) => {
  const [weather, setWeather] = useState<WeatherResponseProps | null>(null);
  const [seedQuote, setSeedQuote] = useState<Quotation | null>(null);
  const [availableQuote, setAvailableQuote] = useState<Quotation | null>(null);
  const { getWeatherCurrentDay, getQuotation } = useHome();
  const { getCoordinates } = useLocation();

  const handlerCardMenuClick = (route: any) => {
    navigation.navigate(route);
  };

  const getData = async () => {    
    const location = await getCoordinates();
    const weatherData = await getWeatherCurrentDay(location);
    
    if (weatherData) {
      setWeather(weatherData);
    }

    const quoteData = await getQuotation();
    
    if (quoteData) {
      setAvailableQuote(quoteData[0]);
      setSeedQuote(quoteData[1]);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <HomeContainer>
      <UserCard
        picture="https://thispersondoesnotexist.com/image"
        name="Coxinha Frita"
      />
      <HomeMenuContainer>
        <HomeMenuCardWidgetContainer>
          <MenuCard
            onPress={() => handlerCardMenuClick("Quotation")}
            widget
            title={translate("home.seeds")}
            value={`R$ ${seedQuote?.Valor || 0}`}
            variation={seedQuote?.Variacao}
            icon={
              seedQuote && seedQuote?.Variacao >= 0
                ? "trending-up"
                : "trending-down"
            }
          />
          <MenuCard
            onPress={() => handlerCardMenuClick("Quotation")}
            widget
            title={translate("home.soybeanPrice")}
            value={`R$ ${availableQuote?.Valor || 0}`}
            variation={availableQuote?.Variacao}
            icon={
              availableQuote && availableQuote?.Variacao >= 0
                ? "trending-up"
                : "trending-down"
            }
          />
          <MenuCard
            onPress={() => handlerCardMenuClick("Weather")}
            widget
            title={translate("home.weather")}
            value={`${weather?.main.temp.toFixed(0) || "0"}º`}
            picture={getWeatherImage(weather?.weather[0].icon || "")}
          />
        </HomeMenuCardWidgetContainer>
        <HomeMenuContentContainer>
          <MenuCardContainer>
            <MenuCard
              onPress={() => handlerCardMenuClick("Properties")}
              title={translate("home.properties")}
              icon="warehouse"
            />
          </MenuCardContainer>
          <MenuCardContainer>
            <MenuCard
              title={translate("home.plots")}
              icon="seed-outline"
              onPress={() => handlerCardMenuClick("Plots")}
            />
          </MenuCardContainer>
          <MenuCardContainer>
            <MenuCard
              onPress={() => handlerCardMenuClick("Statistics")}
              title={translate("home.statistics")}
              icon="chart-line"
            />
          </MenuCardContainer>
        </HomeMenuContentContainer>
      </HomeMenuContainer>
    </HomeContainer>
  );
};
