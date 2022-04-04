import React, { useEffect, useState } from "react";

import { WeatherPropertCard } from "../../components/WeatherPropertCard";
import { WeekDayCard } from "../../components/WeekDayCard";
import { WeatherScreenRouteProps } from "../../data/routes/auth";
import {
  WeatherContainer,
  WeatherDayContent,
  WeatherDayPeriodContainer,
  WeatherDetailsContainer,
  WeatherImage,
  WeatherMainContainer,
  WeatherMaxAndMin,
  WeatherPeriodCard,
  WeatherPeriodTemp,
  WeatherPeriodTitle,
  WeatherStatus,
  WeatherSunsetIconContainer,
  WeatherSunsetIcon,
  WeatherTemp,
  WeekDayCardContainer,
} from "./styles";

import rain from "../../assets/images/weather-rain.png";
import thunderstorm from "../../assets/images/weather-thunder-storm.png";
import clear from "../../assets/images/weather-sun.png";
import clouds from "../../assets/images/weather-cloudy.png";
import few_clouds from "../../assets/images/weather-partly-cloudy.png";
import { WeatherInfoCard } from "../../components/WeatherInfoCard";
import axios from "axios";
import { formatHour } from "../../utils/formatter";
import { RFFontSize } from "../../utils/getResponsiveSizes";

interface WeatherResponseProps {
  dt: number;
  sunrise: number;
  sunset: number;

  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };

  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;

  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain: number;
}

export const Weather: React.FC<WeatherScreenRouteProps> = ({ navigation }) => {
  const [list, setList] = useState<WeatherResponseProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<number | Date>(0);
  const [data, setData] = useState<WeatherResponseProps>(
    {} as WeatherResponseProps
  );

  const handleSelectDate = (date: number) => {
    setSelectedDate(date);
    const data = list.find((item) => item.dt === date);
    if (data) {
      setData(data);
    }
  };

  const getImage = () => {
    if (data?.weather) {
      switch (data.weather[0]?.main) {
        case "Rain":
          return rain;
        case "Thunderstorm":
          return thunderstorm;
        case "Clear":
          return clear;
        case "Clouds":
          if (
            data.weather[0]?.description === "few clouds" ||
            data.weather[0]?.description === "scattered clouds"
          ) {
            return few_clouds;
          } else {
            return clouds;
          }
        default:
          return few_clouds;
      }
    } else {
      return few_clouds;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { list },
        } = await axios.get<{ list: WeatherResponseProps[] }>(
          `http://pro.openweathermap.org/data/2.5/forecast/daily?lat=23.24&lon=45.89&appid=9e4568d2f08dd1b31425e87801aa303d&units=metric&cnt=7`
        );
        setList(list);
        handleSelectDate(list[0].dt);
        setData(list[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (!list?.length) {
      getData();
    }
  });

  return (
    <WeatherContainer>
      {loading ? (
        <WeatherContainer />
      ) : (
        <>
          <WeatherPropertCard />
          <WeekDayCardContainer>
            {list.map((date) => (
              <WeekDayCard
                key={date.dt}
                date={date.dt}
                onPress={() => handleSelectDate(date.dt)}
                selectedDate={selectedDate}
              />
            ))}
          </WeekDayCardContainer>

          <WeatherMainContainer>
            <WeatherImage source={getImage()} resizeMode="contain" />
            <WeatherTemp>{data?.temp?.day.toFixed(0)}º</WeatherTemp>
            <WeatherStatus>
              {data?.weather[0]?.description.toUpperCase()}
            </WeatherStatus>
            <WeatherMaxAndMin>
              max {data?.temp?.max.toFixed(0)}º - min{" "}
              {data?.temp?.min.toFixed(0)}º
            </WeatherMaxAndMin>
            <WeatherDetailsContainer>
              <WeatherInfoCard
                title="Umidade"
                value={`${data?.humidity}%`}
                icon="droplet"
              />
              <WeatherInfoCard
                title="Vento"
                value={`${data?.speed}m/s`}
                icon="wind"
              />
              <WeatherInfoCard
                title="Chuva"
                value={`${data?.pop * 100}%`}
                icon="umbrella"
              />
              <WeatherInfoCard
                title="Volume"
                value={`${data?.rain}mm`}
                icon="cloud-drizzle"
              />
            </WeatherDetailsContainer>
          </WeatherMainContainer>
          <WeatherDayPeriodContainer>
            <WeatherDayContent>
              <WeatherPeriodCard>
                <WeatherPeriodTitle>Manhã</WeatherPeriodTitle>
                <WeatherPeriodTemp>
                  {data?.temp?.morn.toFixed(0)}º
                </WeatherPeriodTemp>
              </WeatherPeriodCard>
              <WeatherPeriodCard>
                <WeatherPeriodTitle>Tarde</WeatherPeriodTitle>
                <WeatherPeriodTemp>
                  {data?.temp?.eve.toFixed(0)}º
                </WeatherPeriodTemp>
              </WeatherPeriodCard>
              <WeatherPeriodCard>
                <WeatherPeriodTitle>Noite</WeatherPeriodTitle>
                <WeatherPeriodTemp>
                  {data?.temp?.night.toFixed(0)}º
                </WeatherPeriodTemp>
              </WeatherPeriodCard>
            </WeatherDayContent>
            <WeatherDayContent>
              <WeatherSunsetIconContainer>
                <WeatherSunsetIcon name="sunrise" size={RFFontSize(32)} />
                <WeatherPeriodCard>
                  <WeatherPeriodTitle>Sunrise</WeatherPeriodTitle>
                  <WeatherPeriodTemp>
                    {formatHour(data?.sunrise)}
                  </WeatherPeriodTemp>
                </WeatherPeriodCard>
              </WeatherSunsetIconContainer>
              <WeatherSunsetIconContainer>
                <WeatherSunsetIcon name="sunset" size={RFFontSize(32)} />
                <WeatherPeriodCard>
                  <WeatherPeriodTitle>Sunset</WeatherPeriodTitle>
                  <WeatherPeriodTemp>
                    {formatHour(data?.sunset)}
                  </WeatherPeriodTemp>
                </WeatherPeriodCard>
              </WeatherSunsetIconContainer>
            </WeatherDayContent>
          </WeatherDayPeriodContainer>
        </>
      )}
    </WeatherContainer>
  );
};
