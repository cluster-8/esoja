import React from 'react';
import { Container, Footer, Header, InfoText, Title } from './styles';

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

export const CultiveCard = ({ data }: Props) => {
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
};
