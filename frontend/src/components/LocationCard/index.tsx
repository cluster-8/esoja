import React from 'react';
import { Property } from '../../data/Model/Property';
import { Container, PropertyTitle } from './styles';

interface LocationCardProps {
  property: Property;
  onClick: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  property,
  onClick
}) => {
  return (
    <Container onPress={() => onClick()}>
      <PropertyTitle>{`${property?.name}`}</PropertyTitle>
    </Container>
  );
};
