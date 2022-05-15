import React from 'react';
import { LocationCard } from '../LocationCard';

import {
  CenteredView,
  ModalView,
  TitleStyled,
  ModalStyled,
  LocationList
} from './styles';

export interface Property {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
}

export interface PropertyModalProps {
  modalVisible: boolean;
  setModalVisible: () => any;
  setSelectedProperty: (property: Property) => void;
  properties: Property[];
}

export interface DataListProps {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  modalVisible = false,
  setModalVisible,
  properties,
  setSelectedProperty
}) => {
  const handleClick = (item: Property) => {
    setSelectedProperty(item);
    setModalVisible();
  };

  return (
    <ModalStyled
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible();
      }}
    >
      <CenteredView>
        <ModalView>
          <TitleStyled>Selecione a propriedade</TitleStyled>
          <LocationList
            data={properties}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <LocationCard data={item} onClick={() => handleClick(item)} />
            )}
          />
        </ModalView>
      </CenteredView>
    </ModalStyled>
  );
};
