import { translate } from '../../data/I18n';
import React from 'react';
import { Sample } from '../../data/Model/Sample';
import { SampleData, SampleInformationContainer, SampleName } from './styles';

interface SampleCardProps {
  sample: Sample;
}

export const SampleCard: React.FC<SampleCardProps> = ({ sample }) => {
  return (
    <SampleInformationContainer>
      <SampleName>{sample?.name}</SampleName>
      <SampleData>{translate('sampleCard.grainsPlant1')} {sample?.grainsPlant1} {translate('sampleCard.grains')}</SampleData>
      <SampleData>{translate('sampleCard.grainsPlant2')} {sample?.grainsPlant2} {translate('sampleCard.grains')}</SampleData>
      <SampleData>{translate('sampleCard.description')} {sample?.description}</SampleData>
    </SampleInformationContainer>
  );
};
