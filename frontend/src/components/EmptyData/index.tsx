import React from 'react';
import { EmptyDataContainer, EmptyDataMessage } from './styles';

interface EmptyDataProps {
  message: string;
}

export const EmptyData: React.FC<EmptyDataProps> = ({ message }) => {
  return (
    <EmptyDataContainer>
      <EmptyDataMessage>{message}</EmptyDataMessage>
    </EmptyDataContainer>
  );
};
