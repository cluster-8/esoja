import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { MenuCard } from '../../components/MenuCard';
import { UserCard } from '../../components/UserCard';
import { translate } from '../../data/I18n';
import { AppRoutesParams, HomeScreenRouteProps } from '../../data/routes/app';
import { useAuth } from '../../hooks/useAuth';
import { Quotation, useHome, WeatherResponseProps } from '../../hooks/useHome';
import { useLocation } from '../../hooks/useLocation';
import { getWeatherImage } from '../../utils/getWeatherImage';
import {
  HeaderButton,
  HeaderButtonContainer,
  HeaderButtonIcon,
  HeaderContainer,
  HomeContainer,
  HomeMenuCardWidgetContainer,
  HomeMenuContainer,
  HomeMenuContentContainer,
  MenuCardContainer
} from './styles';

export const Home: React.FC<HomeScreenRouteProps> = ({ navigation }) => {
  const [weather, setWeather] = useState<WeatherResponseProps | null>(null);
  const [seedQuote, setSeedQuote] = useState<Quotation | null>(null);
  const [availableQuote, setAvailableQuote] = useState<Quotation | null>(null);

  const [loading, setLoading] = useState(false);

  const { authUser, signOut } = useAuth();
  const { getWeatherCurrentDay, getQuotation } = useHome();
  const { getCoordinates } = useLocation();

  const handlerCardMenuClick = (
    route: keyof AppRoutesParams,
    path?: string
  ) => {
    if (route === 'Quotation' && path) {
      return navigation.navigate(route, { selectedPage: path });
    }
    return navigation.navigate(route);
  };

  const handlerClickSignOut = () => {
    Alert.alert(
      translate('home.homeLeaveAlert'),
      translate('home.homeLeaveAlertDescription'),
      [
        {
          text: translate('home.cancelButton'),
          onPress: () =>
            Alert.alert(
              translate('home.homeCancelAlert'),
              translate('home.homeCancelAlertDescription')
            ),
          style: 'cancel'
        },
        {
          text: translate('home.homeOnPressAction'),
          onPress: () => signOut()
        }
      ]
    );
  };

  const handlerClickSync = () => {
    Alert.alert('Sincronizou', 'Sincronizou');
  };

  const getData = useCallback(async () => {
    setLoading(true);
    const location = await getCoordinates();
    setWeather(await getWeatherCurrentDay(location));
    const { availableSoybeanPack, conventionalSeed } = await getQuotation();
    setAvailableQuote(availableSoybeanPack);
    setSeedQuote(conventionalSeed);
    setLoading(false);
  }, [getCoordinates, getQuotation, getWeatherCurrentDay]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <ScrollView>
      <HomeContainer>
        <HeaderContainer>
          <UserCard picture={authUser?.picture || ''} name={authUser?.name} />
          <HeaderButtonContainer>
            <HeaderButton color="attention" onPress={handlerClickSignOut}>
              <HeaderButtonIcon name="log-out" />
            </HeaderButton>
            <HeaderButton color="success" onPress={handlerClickSync}>
              <HeaderButtonIcon name="refresh-cw" />
            </HeaderButton>
          </HeaderButtonContainer>
        </HeaderContainer>
        <HomeMenuContainer>
          <HomeMenuCardWidgetContainer>
            <MenuCard
              onPress={() => handlerCardMenuClick('Quotation', 'SeedQuotation')}
              widget
              title={translate('home.seeds')}
              value={`R$ ${seedQuote?.Valor || 0}`}
              variation={seedQuote?.Variacao}
              loadingIndicator={loading}
              icon={
                seedQuote && seedQuote?.Variacao >= 0
                  ? 'trending-up'
                  : 'trending-down'
              }
            />
            <MenuCard
              onPress={() => handlerCardMenuClick('Quotation', 'BagQuotation')}
              widget
              title={translate('home.soybeanPrice')}
              value={`R$ ${availableQuote?.Valor || 0}`}
              variation={availableQuote?.Variacao}
              loadingIndicator={loading}
              icon={
                availableQuote && availableQuote?.Variacao >= 0
                  ? 'trending-up'
                  : 'trending-down'
              }
            />
            <MenuCard
              onPress={() => handlerCardMenuClick('Weather')}
              widget
              loadingIndicator={loading}
              title={translate('home.weather')}
              value={`${weather?.main.temp.toFixed(0) || '0'}º`}
              picture={getWeatherImage(weather?.weather[0].icon || '')}
            />
          </HomeMenuCardWidgetContainer>
          <HomeMenuContentContainer>
            <MenuCardContainer>
              <MenuCard
                onPress={() => handlerCardMenuClick('Properties')}
                title={translate('home.properties')}
                icon="warehouse"
              />
            </MenuCardContainer>
            <MenuCardContainer>
              <MenuCard
                title={translate('home.plots')}
                icon="seed-outline"
                onPress={() => handlerCardMenuClick('Plots')}
              />
            </MenuCardContainer>
            <MenuCardContainer>
              <MenuCard
                onPress={() => handlerCardMenuClick('Statistics')}
                title={translate('home.statistics')}
                icon="chart-line"
              />
            </MenuCardContainer>
          </HomeMenuContentContainer>
        </HomeMenuContainer>
      </HomeContainer>
    </ScrollView>
  );
};
