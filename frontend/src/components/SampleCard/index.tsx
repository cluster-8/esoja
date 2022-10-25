import React, { useCallback } from 'react';
import { Sample } from '../../data/Model/Sample';
import { SampleData, SampleInformationContainer, SampleName } from './styles';
import { translate } from '../../data/I18n';
import { Alert, Button } from 'react-native';
import { useSample } from '../../hooks/useSample';

interface SampleCardProps {
  sample: Sample;
  updateScreenFunction:any;
}

export const SampleCard: React.FC<SampleCardProps> = ({ sample,updateScreenFunction }) => {
  const {deleteSample} = useSample();

    const removeSample = useCallback(async ()=>{
    try {
      await deleteSample(sample.id);
      updateScreenFunction();
    } catch (error) {
      Alert.alert(
            'Erro',
            'Não foi possível deletar amostra'
          );
    }
    },[sample])

  return (
    <SampleInformationContainer>
      <>
        <SampleName>{sample?.name}</SampleName>
        <SampleData>
          {translate('plots.PlotCardPlants.plant1')}: {sample?.grainsPlant1}{' '}
          {translate('plots.PlotCardPlants.grains')}
        </SampleData>
        <SampleData>
          {translate('plots.PlotCardPlants.plant2')}: {sample?.grainsPlant2}{' '}
          {translate('plots.PlotCardPlants.grains')}
        </SampleData>
        {!!sample?.description && (
          <SampleData>
            {translate('plots.PlotCardPlants.description')}: {sample?.description}
          </SampleData>
        )}
      </>
      <Button title='Deletar' onPress={()=>{removeSample()}} />
    </SampleInformationContainer>
  );
};
