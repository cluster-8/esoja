import React, { useEffect, useState } from 'react';
import { Property } from '../../data/Model/Property';
import { useLocation } from '../../hooks/useLocation';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import {
  CardPropertButton,
  CardPropertContainer,
  CardPropertDate,
  CardPropertIcon,
  CardPropertName,
  CardPropertNameContainer,
  CardPropertOptionIcon,
  CardPropertPropertContainer
} from './style';

interface WeatherPropertCardProps {
  onClick: () => void;
  selectedProperty: Property;
}

export const WeatherPropertCard: React.FC<WeatherPropertCardProps> = ({
  onClick,
  selectedProperty
}) => {
  const [city, setCity] = useState('');
  const { getCity } = useLocation();

  useEffect(() => {
    const getCurrentCity = async () => {
      setCity(
        await getCity({
          latitude: Number(selectedProperty?.latitude),
          longitude: Number(selectedProperty?.longitude)
        })
      );
    };
    getCurrentCity();
  }, [getCity, selectedProperty]);

  return (
    <CardPropertContainer>
      <CardPropertPropertContainer>
        <CardPropertIcon name="map-pin" size={RFFontSize(30)} />
        <CardPropertNameContainer>
          <CardPropertName>
            {selectedProperty?.name || 'Seu local'}
          </CardPropertName>
          <CardPropertDate>{city}</CardPropertDate>
        </CardPropertNameContainer>
      </CardPropertPropertContainer>
      {!!selectedProperty.name && (
        <CardPropertButton onPress={onClick}>
          <CardPropertOptionIcon name="chevron-down" size={RFFontSize(30)} />
        </CardPropertButton>
      )}
    </CardPropertContainer>
  );
};
