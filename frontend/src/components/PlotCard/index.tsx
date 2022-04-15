import React from 'react';

import {
  Container,
  Header,
  Title,
  ExcludeButton,
  Icon,
  Footer,
  InfoText
} from './styles';

export interface CultiveCardProps {
  id: string;
  name: string;
  area: number;
  distancia: number;
  media: number;
  produtividade: number;
}

interface Props {
  data: CultiveCardProps;
}

export function CultiveCard({ data }: Props) {
  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>
      </Header>

      <Footer>
        <InfoText>{`Área - ${data.area} Hectares`}</InfoText>

        <InfoText>{`Distancia entre as linhas de cultivo - ${data.distancia} cm`}</InfoText>

        <InfoText>{`Média de grãos por planta: ${data.media} grãos`}</InfoText>

        <InfoText>{`Estimativa de produtividade - ${data.produtividade} sc/hc`}</InfoText>
      </Footer>
    </Container>
  );
}
