import React from 'react';
import { Avatar } from 'react-native-paper';
import { Plot } from '../../data/Model/Plot';
import { defaultImage } from '../../utils/default';
import { translate } from '../../data/I18n';
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
        <PlotCropYear>
          {translate('plots.PlotCardCropYear')}: {plot?.cropYear}
        </PlotCropYear>
        <PlotArea>Area: {plot?.areaTotal} hectares</PlotArea>
        {plot?.expectedProduction && (
          <PlotProduction>
            {translate('plots.PlotCardProdExpectation')}:{' '}
            {plot.expectedProduction}
          </PlotProduction>
        )}
      </InformationContainer>
    </PlotInformationContainer>
  );
};
