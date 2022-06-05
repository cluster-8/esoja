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
      <SampleData>Planta 1: {sample?.grainsPlant1} grãos</SampleData>
      <SampleData>Planta 2: {sample?.grainsPlant2} grãos</SampleData>
      {!!sample?.description && (
        <SampleData>Descrição: {sample?.description}</SampleData>
      )}
    </SampleInformationContainer>
  );
};
