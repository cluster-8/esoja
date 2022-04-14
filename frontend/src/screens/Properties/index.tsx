import React from "react";

import { PropertiesScreenRouteProps } from "../../data/routes/auth";

import {
  Container,
  Header,
  Title,
  SubTitle,
  PropertyList,
  AddButton,
  Icon,
} from './styles';

import { PropertyCard, PropertyCardProps } from '../../components/PropertyCard';
import { translate } from "../../data/I18n";

export interface DataListProps extends PropertyCardProps {
  id: string;
}

export const Properties: React.FC<PropertiesScreenRouteProps> = ({ navigation }) => {
  const data = [
    {
      id: '1',
      name: 'Teste 1',
      area: 40,
      total_tal: 10,
      cep: '12236-487',
      city: 'São José dos Campos',
      state: 'SP',
    },
    {
      id: '2',
      name: 'Teste 2',
      area: 40,
      total_tal: 10,
      cep: '12236-487',
      city: 'São José dos Campos',
      state: 'SP',
    },
    {
      id: '3',
      name: 'Teste 3',
      area: 40,
      total_tal: 10,
      cep: '12236-487',
      city: 'São José dos Campos',
      state: 'SP',
    },
    {
      id: '4',
      name: 'Teste 4',
      area: 40,
      total_tal: 10,
      cep: '12236-487',
      city: 'São José dos Campos',
      state: 'SP',
    },
  ]

  return (
    <Container>
      <Header>
        <Title>{translate('properties.properties')}</Title>
        <SubTitle>{translate('properties.SeAllYourProperties')}</SubTitle>
      </Header>

      <PropertyList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PropertyCard data={item} />}
      />

      <AddButton onPress={() => navigation.navigate('NewProperty')}>
        <Icon name={'plus'} />
      </AddButton>
    </Container>
  );
};
