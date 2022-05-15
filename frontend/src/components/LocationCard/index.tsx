import React from 'react';

import { Container, PropertyTitle } from './styles';

export interface LocationCardProps {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  //   area?: number;
  //   total_tal?: number;
  //   cep?: string;
  //   city?: string;
  //   state?: string;
}

interface Props {
  data: LocationCardProps;
  onClick: () => void;
}

export const LocationCard: React.FC<Props> = ({ data, onClick }) => {
  return (
    <Container onPress={() => onClick()}>
      <PropertyTitle>{`${data?.name}`}</PropertyTitle>
    </Container>
  );
};
