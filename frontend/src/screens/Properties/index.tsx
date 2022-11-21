import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const { authUser, isConnected } = useAuth();
  const { getProperties } = useProperty();

  const handleSelectProperty = (propertyId: string) => {
    navigation.navigate('PropertyDetail', { propertyId });
  };

  const getData = useCallback(async () => {
    if (isConnected) {
      const query: Query = {
        select: 'name city state picture',
        populate: [{ path: 'cultives', select: 'id' }],
        filter: [{ path: 'userId', operator: 'equals', value: authUser.id }]
      };
      const data = await getProperties(query);
      setProperties(data);
      await AsyncStorage.setItem('@esoja:propertiesPage', JSON.stringify(data));
    } else {
      const data: any = await AsyncStorage.getItem('@esoja:propertiesPage');
      setProperties(JSON.parse(data));
    }
  }, [authUser.id, getProperties, isConnected]);

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      getData();
    });
    return subscription;
  }, [getData, navigation, isConnected]);

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
