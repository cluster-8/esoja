/* eslint-disable react/no-array-index-key */
import { translate } from '../../data/I18n'
import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { EmptyData } from '../../components/EmptyData';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { SampleCard } from '../../components/SampleCard';
import Title from '../../components/Title';
import { Plot } from '../../data/Model/Plot';
import { PlotDetailScreenRouteProps } from '../../data/routes/app';
import { useSample } from '../../hooks/useSample';
import { defaultImage } from '../../utils/default';
import {
  PlotArea,
  PlotCropYear,
  PlotDetailCardTitle,
  PlotDetailContainer,
  PlotDetailHeaderContainer,
  PlotDetailImage,
  PlotDetailPlotCardContainer,
  PlotDetailTitleContainer,
  PlotProduction
} from './styles';

export const PlotDetail: React.FC<PlotDetailScreenRouteProps> = ({
  navigation,
  route
}) => {
  const [plot, setPlot] = useState<Plot | null>(null);

  const { plotId } = route.params;

  const { getPlot } = useSample();

  const getData = useCallback(async () => {
    const query: Query = {
      select:
        'cropYear areaTotal photo plantingDate description metersBetweenPlants plantsPerMeter',
      populate: [
        {
          path: 'samples',
          select: 'description grainsPlant1 grainsPlant2 name'
        },
        { path: 'property', select: 'name' }
      ],
      filter: [{ path: 'id', operator: 'equals', value: plotId }]
    };
    try {
      const properties = await getPlot(query);
      setPlot(properties[0]);
    } catch (err) {
      Alert.alert('Erro ao carregar propriedade');
    }
  }, [getPlot, plotId]);

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      getData();
    });
    return subscription;
  }, [getData, navigation]);
  return (
    <ScrollView>
      <PlotDetailContainer>
        {plot ? (
          <>
            <PlotDetailHeaderContainer>
              <PlotDetailImage
                source={{ uri: plot?.photo || defaultImage }}
                resizeMode="cover"
              />
            </PlotDetailHeaderContainer>
            <PlotDetailTitleContainer>
              <Title title={plot?.description || 'PlotDetail.title'} />
              <PlotCropYear>Safra {plot?.cropYear}</PlotCropYear>
              <PlotArea>Area {plot?.areaTotal} hectares</PlotArea>
              <PlotCropYear>{plot?.metersBetweenPlants}</PlotCropYear>
              <PlotArea>{plot?.plantsPerMeter}</PlotArea>
              <PlotArea>{plot?.property.name} </PlotArea>
              <PlotProduction>Estimativa de produção</PlotProduction>
            </PlotDetailTitleContainer>
            <PlotDetailPlotCardContainer>
              <PlotDetailCardTitle>Amostra do talhão</PlotDetailCardTitle>
              {plot?.samples?.length === 0 && (
                <EmptyData message={translate('PlotDetail.EmptyData')} />
              )}
              {plot?.samples?.map((sample, index) => (
                <SampleCard sample={sample} key={index} />
              ))}
            </PlotDetailPlotCardContainer>
          </>
        ) : (
          <LoadingIndicator message={translate('PlotDetail.LoadingIndicator')} />
        )}
      </PlotDetailContainer>
    </ScrollView>
  );
};
