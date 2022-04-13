import React from "react";

import { CultivesScreenRouteProps } from "../../data/routes/auth";

import {
  Container,
  Header,
  Title,
  SubTitle,
  CultiveList,
  AddButton,
  Icon,
} from './styles';

import { CultiveCard, CultiveCardProps } from '../../components/CultiveCard';

export interface DataListProps extends CultiveCardProps {
  id: string;
}

export const Cultives: React.FC<CultivesScreenRouteProps> = ({ navigation }) => {
  const data = [
    {
      id: '1',
      name: 'Teste 1',
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
    {
      id: '2',
      name: 'Teste 2',
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
    {
      id: '3',
      name: 'Teste 3',
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
    {
      id: '4',
      name: 'Teste 4',
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    }
  ]

  return (
    <Container>
      <Header>
        <Title>Talhões</Title>

        <SubTitle>Visualize todos seus cultivos registrados.</SubTitle>
      </Header>

      <CultiveList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CultiveCard data={item} />}
      />

      <AddButton onPress={() => navigation.navigate('NewProperty')}>
        <Icon name={'plus'} />
      </AddButton>
    </Container>
  );
};
