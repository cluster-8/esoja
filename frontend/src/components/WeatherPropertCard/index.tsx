import React from 'react';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import {
  CardPropertButton,
  CardPropertContainer,
  CardPropertDate,
  CardPropertIcon,
  CardPropertName,
  CardPropertNameContainer
} from './style';

export const WeatherPropertCard: React.FC = () => {
  const onPress = () => {};
  return (
    <CardPropertContainer>
      <CardPropertIcon name="map-pin" size={RFFontSize(40)} />
      <CardPropertNameContainer>
        <CardPropertName>São José dos Campos - SP</CardPropertName>
        <CardPropertDate>quarta-feira, 30 mar 2022</CardPropertDate>
      </CardPropertNameContainer>
      <CardPropertButton onPress={onPress}>
        <CardPropertIcon name="chevron-down" size={RFFontSize(30)} />
      </CardPropertButton>
    </CardPropertContainer>
  );
};
