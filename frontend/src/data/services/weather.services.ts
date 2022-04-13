import axios from "axios";
import { WeatherResponseProps } from "../../hooks/useHome";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherForecastProps {
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
  humidity: number;
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  speed: number;
  pop: number;
  rain: number;
}

export const getWeatherForecast = async (
  coordinates: Coordinates,
  lang: string
) => {
  try {
    const {
      data: { list },
    } = await axios.get<{ list: WeatherForecastProps[] }>(
      `http://pro.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&cnt=7`
    );
    return list;
  } catch (err) {}
};

export const getWeatherDay = async (coordinates: Coordinates) => {
  try {
    const { data } = await axios.get<WeatherResponseProps>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
    );
    return data;
  } catch (err) {}
};
