import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { WeatherInfoCard } from '../../components/WeatherInfoCard';
import { WeatherPropertCard } from '../../components/WeatherPropertCard';
import { WeekDayCard } from '../../components/WeekDayCard';
import { translate } from '../../data/I18n';
import { WeatherScreenRouteProps } from '../../data/routes/app';
import {
  getWeatherForecast,
  WeatherForecastProps
} from '../../data/services/weather.services';
import { useLocation } from '../../hooks/useLocation';
import { formatHour } from '../../utils/formatter';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import { getWeatherImage } from '../../utils/getWeatherImage';
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
  WeatherSunsetIcon,
  WeatherSunsetIconContainer,
  WeatherTemp,
  WeekDayCardContainer
} from './styles';

export const Weather: React.FC<WeatherScreenRouteProps> = ({ navigation }) => {
  const [list, setList] = useState<WeatherForecastProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<number | Date>(0);
  const [data, setData] = useState<WeatherForecastProps>(
    {} as WeatherForecastProps
  );
  const [weatherType, setWeatherType] = useState<string>('');

  const { getCoordinates } = useLocation();

  const handleSelectDate = (date: number) => {
    setSelectedDate(date);
    const dataItem = list.find(item => item.dt === date);
    if (dataItem) {
      setData(dataItem);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const coordinates = await getCoordinates();

      const weather = await getWeatherForecast(coordinates, 'pt_br');

      if (weather) {
        setList(weather);
        handleSelectDate(weather[0].dt);
        setData(weather[0]);
        setWeatherType(weather[0].weather[0].main);
        setLoading(false);
      }
    };
    if (!list?.length) {
      getData();
    }
  });

  return (
    <ScrollView>
      <StatusBar backgroundColor="transparent" translucent />

      <WeatherContainer weatherType={weatherType}>
        {loading ? (
          <WeatherContainer weatherType={weatherType} />
        ) : (
          <>
            <WeatherPropertCard />
            <WeekDayCardContainer>
              {list.map(date => (
                <ScrollView horizontal>
                  <WeekDayCard
                    key={date.dt}
                    date={date.dt}
                    onPress={() => handleSelectDate(date.dt)}
                    selectedDate={selectedDate}
                  />
                </ScrollView>
              ))}
            </WeekDayCardContainer>

            <WeatherMainContainer>
              <WeatherImage
                source={getWeatherImage(data?.weather[0]?.icon)}
                resizeMode="contain"
              />
              <WeatherTemp>{data?.temp?.day.toFixed(0)}º</WeatherTemp>
              <WeatherStatus>
                {data?.weather[0]?.description.toUpperCase()}
              </WeatherStatus>
              <WeatherMaxAndMin>
                max {data?.temp?.max.toFixed(0)}º - min{' '}
                {data?.temp?.min.toFixed(0)}º
              </WeatherMaxAndMin>
              <WeatherDetailsContainer>
                <WeatherInfoCard
                  title={translate('weather.humidity')}
                  value={`${data?.humidity}%`}
                  icon="droplet"
                />
                <WeatherInfoCard
                  title={translate('weather.wind')}
                  value={`${data?.speed}m/s`}
                  icon="wind"
                />
                <WeatherInfoCard
                  title={translate('weather.rain')}
                  value={`${(data.pop * 100).toFixed(0)}%`}
                  icon="umbrella"
                />
                <WeatherInfoCard
                  title={translate('weather.precipitation')}
                  value={`${data?.rain || 0}mm`}
                  icon="cloud-drizzle"
                />
              </WeatherDetailsContainer>
            </WeatherMainContainer>
            <WeatherDayPeriodContainer>
              <WeatherDayContent>
                <WeatherPeriodCard>
                  <WeatherPeriodTitle>
                    {translate('weather.morning')}
                  </WeatherPeriodTitle>
                  <WeatherPeriodTemp>
                    {data?.temp?.morn.toFixed(0)}º
                  </WeatherPeriodTemp>
                </WeatherPeriodCard>
                <WeatherPeriodCard>
                  <WeatherPeriodTitle>
                    {translate('weather.afternoon')}
                  </WeatherPeriodTitle>
                  <WeatherPeriodTemp>
                    {data?.temp?.eve.toFixed(0)}º
                  </WeatherPeriodTemp>
                </WeatherPeriodCard>
                <WeatherPeriodCard>
                  <WeatherPeriodTitle>
                    {translate('weather.evening')}
                  </WeatherPeriodTitle>
                  <WeatherPeriodTemp>
                    {data?.temp?.night.toFixed(0)}º
                  </WeatherPeriodTemp>
                </WeatherPeriodCard>
              </WeatherDayContent>
              <WeatherDayContent>
                <WeatherSunsetIconContainer>
                  <WeatherSunsetIcon name="sunrise" size={RFFontSize(32)} />
                  <WeatherPeriodCard>
                    <WeatherPeriodTitle>
                      {translate('weather.sunrise')}
                    </WeatherPeriodTitle>
                    <WeatherPeriodTemp>
                      {formatHour(data?.sunrise)}
                    </WeatherPeriodTemp>
                  </WeatherPeriodCard>
                </WeatherSunsetIconContainer>
                <WeatherSunsetIconContainer>
                  <WeatherSunsetIcon name="sunset" size={RFFontSize(32)} />
                  <WeatherPeriodCard>
                    <WeatherPeriodTitle>
                      {translate('weather.sunset')}
                    </WeatherPeriodTitle>
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
    </ScrollView>
  );
};
