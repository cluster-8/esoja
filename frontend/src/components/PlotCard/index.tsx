import React from 'react';
import { Avatar } from 'react-native-paper';
import { Plot } from '../../data/Model/Plot';
import { defaultImage } from '../../utils/default';
import {
  InformationContainer,
  PlotArea,
  PlotCropYear,
  PlotInformationContainer,
  PlotProduction
} from './styles';

interface PlotCardProps {
  plot: Plot;
  onPress: (plotId: string) => void;
}

export const PlotCard: React.FC<PlotCardProps> = ({ plot, onPress }) => {
  return (
    <PlotInformationContainer onPress={() => onPress(plot.id)}>
      <Avatar.Image source={{ uri: plot?.photo || defaultImage }} />
      <InformationContainer>
        <PlotCropYear>Safra {plot?.cropYear}</PlotCropYear>
        <PlotArea>Area {plot?.areaTotal} hectares</PlotArea>
        <PlotProduction>Estimativa de produção</PlotProduction>
      </InformationContainer>
    </PlotInformationContainer>
  );
};
