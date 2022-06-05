import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { EmptyData } from '../../components/EmptyData';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PlotCard } from '../../components/PlotCard';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Property } from '../../data/Model/Property';
import { PropertyDetailScreenRouteProps } from '../../data/routes/app';
import { useProperty } from '../../hooks/useProperty';
import { defaultImage } from '../../utils/default';
import {
  PropertyDetailCardTitle,
  PropertyDetailCity,
  PropertyDetailContainer,
  PropertyDetailHeaderContainer,
  PropertyDetailImage,
  PropertyDetailPlotCardContainer,
  PropertyDetailTitleContainer
} from './styles';

export const PropertyDetail: React.FC<PropertyDetailScreenRouteProps> = ({
  navigation,
  route
}) => {
  const [property, setProperty] = useState<Property | null>(null);

  const { propertyId } = route.params;

  const { getProperties } = useProperty();

  const handleSelectPlot = (plotId: string) => {
    navigation.navigate('PlotDetail', { plotId });
  };

  const getData = useCallback(async () => {
    const query: Query = {
      select: 'name picture city state',
      populate: [
        { path: 'cultives', select: 'cropYear areaTotal photo description' }
      ],
      filter: [{ path: 'id', operator: 'equals', value: propertyId }]
    };
    try {
      const properties = await getProperties(query);
      setProperty(properties[0]);
    } catch (err) {
      Alert.alert(translate('properties.PropertyDetailLoadError'));
    }
  }, [getProperties, propertyId]);

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      getData();
    });
    return subscription;
  }, [getData, navigation]);
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
