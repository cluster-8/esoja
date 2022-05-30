import React from 'react';
import { Avatar } from 'react-native-paper';
import { Property } from '../../data/Model/Property';
import { defaultImage } from '../../utils/default';
import {
  InformationContainer,
  PropertyCity,
  PropertyInformationContainer,
  PropertyName
} from './styles';

interface PropertyCardProps {
  property: Property;
  onPress: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress
}) => {
  return (
    <PropertyInformationContainer onPress={() => onPress(property.id)}>
      <Avatar.Image source={{ uri: property?.picture || defaultImage }} />
      <InformationContainer>
        <PropertyName>{property?.name || ''}</PropertyName>
        <PropertyCity>
          {`${property?.cultives?.length} Talhoes cadastrados` ||
            'Nenhum talhão cadastrado'}
        </PropertyCity>
        <PropertyCity>{property?.city || ''}</PropertyCity>
      </InformationContainer>
    </PropertyInformationContainer>
  );
};
