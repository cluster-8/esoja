import React from 'react';
import { Avatar } from 'react-native-paper';
import { Plot } from '../../data/Model/Plot';
import { defaultImage } from '../../utils/default';
import {
  InformationContainer,
  PlotArea,
  PlotCropYear,
  PlotInformationContainer,
  PlotName,
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
        <PlotName>{plot?.description}</PlotName>
        <PlotCropYear>Safra {plot?.cropYear}</PlotCropYear>
        <PlotArea>Area {plot?.areaTotal} hectares</PlotArea>
        {plot?.expectedProduction && (
          <PlotProduction>
            Estimativa de produção: {plot.expectedProduction}
          </PlotProduction>
        )}
      </InformationContainer>
    </PlotInformationContainer>
  );
};
