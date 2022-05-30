import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useCallback, useEffect, useState } from 'react';
import { PropertyCard } from '../../components/PropertyCard';
import { Separator } from '../../components/Separator';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Property } from '../../data/Model/Property';
import { PropertiesScreenRouteProps } from '../../data/routes/app';
import { useAuth } from '../../hooks/useAuth';
import { useProperty } from '../../hooks/useProperty';
import { AddButton, Container, Header, Icon, PropertyList } from './styles';

export const Properties: React.FC<PropertiesScreenRouteProps> = ({
  navigation
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const { authUser } = useAuth();
  const { getProperties } = useProperty();

  const handleSelectProperty = (propertyId: string) => {
    navigation.navigate('PropertyDetail', { propertyId });
  };

  const getData = useCallback(async () => {
    const query: Query = {
      select: 'name city state picture',
      populate: [{ path: 'cultives', select: 'id' }],
      filter: [{ path: 'userId', operator: 'equals', value: authUser.id }]
    };
    setProperties(await getProperties(query));
  }, [authUser.id, getProperties]);

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      getData();
    });
    return subscription;
  }, [getData, navigation]);

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
        renderItem={({ item }) => (
          <PropertyCard property={item} onPress={handleSelectProperty} />
        )}
      />

      <AddButton onPress={() => navigation.navigate('NewProperty')}>
        <Icon name="plus" />
      </AddButton>
    </Container>
  );
};
