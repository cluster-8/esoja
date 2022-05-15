import React, { useCallback, useEffect, useState } from 'react';
import { PropertyCard } from '../../components/PropertyCard';
import { Separator } from '../../components/Separator';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Property } from '../../data/Model/Property';
import { PropertiesScreenRouteProps } from '../../data/routes/app';
import { useProperty } from '../../hooks/useProperty';
import { AddButton, Container, Header, Icon, PropertyList } from './styles';

export const Properties: React.FC<PropertiesScreenRouteProps> = ({
  navigation
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const { getProperties } = useProperty();

  const getData = useCallback(async () => {
    const query =
      '?select=name city state&populate[0][path]=cultives&populate[0][select]=id';
    setProperties(await getProperties(query));
  }, [getProperties]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <Header>
        <Title
          title={translate('properties.properties')}
          subtitle={translate('properties.SeAllYourProperties')}
        />
      </Header>

      <PropertyList
        data={properties}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PropertyCard property={item} />}
      />

      <AddButton onPress={() => navigation.navigate('NewProperty')}>
        <Icon name="plus" />
      </AddButton>
    </Container>
  );
};
