/* eslint-disable react/no-array-index-key */
import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { EmptyData } from '../../components/EmptyData';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { SampleCard } from '../../components/SampleCard';
import { StrongText } from '../../components/StrongText';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Plot } from '../../data/Model/Plot';
import { PlotDetailScreenRouteProps } from '../../data/routes/app';
import { usePlot } from '../../hooks/usePlot';
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
  PlotProduction,
  PlotProperty
} from './styles';

export const PlotDetail: React.FC<PlotDetailScreenRouteProps> = ({
  navigation,
  route
}) => {
  const [plot, setPlot] = useState<Plot | null>(null);

  const { plotId } = route.params;

  const { getPlots } = usePlot();

  const getData = useCallback(async () => {
    const query: Query = {
      select:
        'cropYear areaTotal photo plantingDate description metersBetweenPlants plantsPerMeter expectedProduction expectedBagsPerHectares',
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
      const properties = await getPlots(query);
      setPlot(properties[0]);
    } catch (err) {
      Alert.alert(translate('plots.PlotDetailLoadProErro'));
    }
  }, [getPlots, plotId]);

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
              <Title
                title={
                  plot?.description || translate('plots.PlotDetailDefaultTitle')
                }
              />
              <PlotProperty>{plot?.property.name?.toUpperCase()}</PlotProperty>
              <PlotArea>
                <StrongText>{translate('plots.PlotDetailArea')}: </StrongText>
                {plot?.areaTotal} {translate('plots.PlotDetailAreaUnit')}
              </PlotArea>
              <PlotCropYear>
                <StrongText>
                  {translate('plots.PlotDetailCropYear')}:
                </StrongText>{' '}
                {plot?.cropYear}
              </PlotCropYear>
              {!!plot?.samples?.length && (
                <>
                  <PlotArea>
                    <StrongText>
                      {translate('plots.PlotDetailPlantsPerMeter')}:
                    </StrongText>{' '}
                    {plot?.plantsPerMeter}
                  </PlotArea>
                  <PlotCropYear>
                    <StrongText>
                      {translate('plots.PlotDetailDistanceBetween')}:
                    </StrongText>{' '}
                    {plot?.metersBetweenPlants}cm
                  </PlotCropYear>
                  <PlotProduction>
                    <StrongText>
                      {translate('plots.PlotDetailProdExpectation')}:{' '}
                    </StrongText>
                    {plot?.expectedProduction.toFixed(2)} ton/ha
                  </PlotProduction>
                </>
              )}
            </PlotDetailTitleContainer>
            <PlotDetailPlotCardContainer>
              <PlotDetailCardTitle>
                {translate('plots.PlotDetailFieldSample')}
              </PlotDetailCardTitle>
              {plot?.samples?.length === 0 && (
                <>
                  <EmptyData message={translate('plots.PlotDetailEmptyMsg')} />
                  <Button
                    style={{ width: '80%', marginBottom: 'auto' }}
                    title={translate('plots.PlotDetailRegisterSample')}
                    onPress={() =>
                      navigation.navigate('PlantingDistance', {
                        cultiveId: plot.id
                      })
                    }
                  />
                </>
              )}
              {plot?.samples?.map((sample, index) => (
                <SampleCard sample={sample} key={index} />
              ))}
            </PlotDetailPlotCardContainer>
          </>
        ) : (
          <LoadingIndicator message={translate('plots.PlotDetailLoading')} />
        )}
      </PlotDetailContainer>
    </ScrollView>
  );
};
