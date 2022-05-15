import React from 'react';
import { Avatar } from 'react-native-paper';
import { Plot } from '../../data/Model/Plot';
import { defaultImage } from '../../utils/default';
import {
  InformationContainer,
  PropertyCity,
  PropertyInformationContainer,
  PropertyName
} from './styles';

interface PlotCardProps {
  plot: Plot;
}

export const PlotCard: React.FC<PlotCardProps> = ({ plot }) => {
  return (
    <PropertyInformationContainer>
      <Avatar.Image source={{ uri: plot?.photo || defaultImage }} />
      <InformationContainer>
        <PropertyName>Safra {plot?.cropYear}</PropertyName>
        <PropertyCity>Area {plot?.areaTotal} hectares</PropertyCity>
        <PropertyCity>Estimativa de produção</PropertyCity>
      </InformationContainer>
    </PropertyInformationContainer>
  );
};
