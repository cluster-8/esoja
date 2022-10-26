import AsyncStorage from '@react-native-async-storage/async-storage';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { EmptyData } from '../../components/EmptyData';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PlotCard } from '../../components/PlotCard';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Property } from '../../data/Model/Property';
import { PropertyDetailScreenRouteProps } from '../../data/routes/app';
import { useAuth } from '../../hooks/useAuth';
import { useProperty } from '../../hooks/useProperty';
import { DeleteButtonLarge } from '../../components//DeleteButtonLarge';
import { defaultImage } from '../../utils/default';
import {
  PropertyDetailCardTitle,
  PropertyDetailCity,
  PropertyDetailContainer,
  PropertyDetailHeaderContainer,
  PropertyDetailImage,
  PropertyDetailPlotCardContainer,
  PropertyDetailTitleContainer,
  ViewBottom
} from './styles';

export const PropertyDetail: React.FC<PropertyDetailScreenRouteProps> = ({
  navigation,
  route
}) => {
  const [property, setProperty] = useState<Property | null>(null);

  const { propertyId } = route.params;

  const { isConnected } = useAuth();
  const { getProperties,deleteProperty } = useProperty();

  const removeProperty = async ()=>{
    try {
      await deleteProperty(propertyId);
      navigation.navigate('Properties')
    } catch (error) {
        Alert.alert('Error','deu merda bixo')
    }
  }

  const handleSelectPlot = (plotId: string) => {
    navigation.navigate('PlotDetail', { plotId });
  };

  const getData = useCallback(async () => {
    if (isConnected) {
      const query: Query = {
        select: 'name picture city state',
        populate: [
          {
            path: 'cultives',
            select: 'cropYear areaTotal photo description expectedProduction'
          }
        ],
        filter: [{ path: 'id', operator: 'equals', value: propertyId }]
      };
      try {
        const properties = await getProperties(query);
        setProperty(properties[0]);
        await AsyncStorage.setItem(
          '@esoja:propertyDetail',
          JSON.stringify(properties[0])
        );
      } catch (err) {
        Alert.alert(translate('properties.PropertyDetailLoadError'));
      }
    } else {
      const data: any = await AsyncStorage.getItem('@esoja:propertyDetail');
      setProperty(JSON.parse(data));
    }
  }, [getProperties, propertyId, isConnected]);

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      getData();
    });
    return subscription;
  }, [getData, navigation, isConnected]);
  return (
    <PropertyDetailContainer>
      {property ? (
        <>
          <PropertyDetailHeaderContainer>
              <PropertyDetailImage
                source={{ uri: property?.picture || defaultImage }}
                resizeMode="cover"
              />
            </PropertyDetailHeaderContainer>
            <PropertyDetailTitleContainer>
              <Title
                title={
                  property?.name ||
                  translate('properties.PropertyDetailDefaultName')
                }
              />
              <PropertyDetailCity>
                {property?.city} - {property?.state}
              </PropertyDetailCity>
            </PropertyDetailTitleContainer>
            <PropertyDetailPlotCardContainer>
              <PropertyDetailCardTitle>
                {translate('properties.PropertyDetailFields')} {property?.name}
              </PropertyDetailCardTitle>
              {property?.cultives?.length === 0 && (
                <EmptyData
                message={translate('properties.PropertyDetailFieldsNotFound')}
                />
                )}
              {property?.cultives?.map(plot => (
                <PlotCard plot={plot} key={plot.id} onPress={handleSelectPlot} />
                ))}

            <ViewBottom>
              <DeleteButtonLarge onPress={()=>{removeProperty()}}  />
            </ViewBottom>
          </PropertyDetailPlotCardContainer>
        </>
      ) : (
        <LoadingIndicator
        message={translate('properties.PropertyDetailLoadingProperty')}
        />
        )}
    </PropertyDetailContainer>
  );
};
