import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { PropertyModal } from '../../components/PropertyModal';
import { WeatherInfoCard } from '../../components/WeatherInfoCard';
import { WeatherPropertCard } from '../../components/WeatherPropertCard';
import { WeekDayCard } from '../../components/WeekDayCard';
import { translate } from '../../data/I18n';
import { WeatherScreenRouteProps } from '../../data/routes/app';
import {
  getWeatherForecast,
  WeatherForecastProps
} from '../../data/services/weather.services';
import { useProperty } from '../../hooks/useProperty';
import { formatHour } from '../../utils/formatter';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import { getWeatherImage } from '../../utils/getWeatherImage';
import { queryBuilder } from '../../utils/queryBuilder';
import {
  LoadingContainer,
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

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const Weather: React.FC<WeatherScreenRouteProps> = () => {
  const [list, setList] = useState<WeatherForecastProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [propertyList, setPropertyList] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any[]>([]);

  const [weatherType, setWeatherType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | Date>(0);
  const [data, setData] = useState<WeatherForecastProps>(
    {} as WeatherForecastProps
  );

  const theme = useTheme();
  const { getProperties } = useProperty();

  const handleSelectDate = useCallback(
    (weather: WeatherForecastProps[], date: number) => {
      setSelectedDate(date);
      const dataItem = weather.find(item => item.dt === date);
      if (dataItem) {
        setData(dataItem);
      }
    },
    []
  );

  const getData = useCallback(
    async (coords: Coordinates) => {
      const weather = await getWeatherForecast(coords, 'pt_br');
      if (weather) {
        setList(weather);
        handleSelectDate(weather, weather[0].dt);
        setData(weather[0]);
        setWeatherType(weather[0].weather[0].main);
        setLoading(false);
      }
    },
    [handleSelectDate]
  );

  const handleSelectProperty = useCallback(
    async (property: any) => {
      await getData({
        latitude: property?.latitude,
        longitude: property?.longitude
      });
      setSelectedProperty(property);
    },
    [getData]
  );

  const handlePropertyCardClick = async () => {
    if (!propertyList?.length) {
      const query = queryBuilder({ select: 'name latitude longitude' });
      const res = await getProperties(query);
      setModalVisible(true);
      if (res) {
        setPropertyList(res);
      } else {
        Alert.alert('Não possivel buscar as propriedades');
      }
    }
    setModalVisible(true);
  };

  const firstTime = useCallback(async () => {
    const query = queryBuilder({ select: 'name latitude longitude' });
    const res = await getProperties(query);
    handleSelectProperty(res[0]);
  }, [getProperties, handleSelectProperty]);

  useEffect(() => {
    firstTime();
  }, [firstTime]);

  return (
    <ScrollView>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.text} />
        </LoadingContainer>
      ) : (
        <>
          <StatusBar backgroundColor="transparent" translucent />
          <WeatherContainer weatherType={weatherType}>
            <WeatherPropertCard
              onClick={handlePropertyCardClick}
              selectedProperty={selectedProperty}
            />
            <WeekDayCardContainer>
              {list.map(date => (
                <ScrollView horizontal key={date.dt}>
                  <WeekDayCard
                    date={date.dt}
                    onPress={() => handleSelectDate(list, date.dt)}
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
          </WeatherContainer>
          <PropertyModal
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(!modalVisible)}
            setSelectedProperty={handleSelectProperty}
            properties={propertyList}
          />
        </>
      )}
    </ScrollView>
  );
};
