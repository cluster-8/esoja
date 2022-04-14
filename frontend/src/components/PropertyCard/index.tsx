import React from 'react';

import { Container, Header, Title, ExcludeButton, Icon, Footer, InfoText } from './styles';

export interface PropertyCardProps {
  id: string;
  name: string;
  area: number;
  total_tal: number;
  cep: string;
  city: string;
  state: string;
}

interface Props {
  data: PropertyCardProps;
}

export function PropertyCard({ data }: Props) {
  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>
      </Header>

      <Footer>
        <InfoText>{`Área - ${data.area} Hectares`}</InfoText>

        <InfoText>{`Total de talhões - ${data.total_tal}`}</InfoText>

        <InfoText>{`CEP: ${data.cep}`}</InfoText>

        <InfoText>{`${data.city} - ${data.state}`}</InfoText>
      </Footer>
    </Container>
  );
}
