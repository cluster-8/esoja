import React from 'react';
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

export const WeatherPropertCard: React.FC = () => {
  return (
    <CardPropertContainer>
      <CardPropertPropertContainer>
        <CardPropertIcon name="map-pin" size={RFFontSize(30)} />
        <CardPropertNameContainer>
          <CardPropertName>São José dos Campos - SP</CardPropertName>
          <CardPropertDate>quarta-feira, 30 mar 2022</CardPropertDate>
        </CardPropertNameContainer>
      </CardPropertPropertContainer>
      <CardPropertButton onPress={() => console.log('apertou')}>
        <CardPropertOptionIcon name="chevron-down" size={RFFontSize(30)} />
      </CardPropertButton>
    </CardPropertContainer>
  );
};
