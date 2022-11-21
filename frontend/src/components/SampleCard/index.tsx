import React, { useCallback } from 'react';
import { Sample } from '../../data/Model/Sample';
import { SampleData, SampleInformationContainer, SampleName } from './styles';
import { translate } from '../../data/I18n';
import { DeleteButton } from '../../components/DeleteButton';
import { Alert, View, } from 'react-native';
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
            translate('sample.errorAlertTitle'),
            translate('sample.deletingError')
          );
    }
    },[sample])

  return (
    <SampleInformationContainer>
      <View >
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
        </View>
      <DeleteButton style={{width:75}} onPress={()=>{removeSample()}} />
    </SampleInformationContainer>
  );
};
