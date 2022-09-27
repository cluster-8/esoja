import React from 'react';
import { Property } from '../../data/Model/Property';
import { LocationCard } from '../LocationCard';
import { Separator } from '../Separator';
import {
  CenteredView,
  CloseButton,
  CloseButtonIcon,
  LocationList,
  ModalStyled,
  ModalView,
  TitleStyled
} from './styles';

export interface PropertyModalProps {
  modalVisible: boolean;
  setModalVisible: () => unknown;
  setSelectedProperty: (property: Property) => void;
  properties: Property[];
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
          <CloseButton onPress={setModalVisible}>
            <CloseButtonIcon name="x-circle" />
          </CloseButton>
          <TitleStyled>Selecione a propriedade</TitleStyled>
          <LocationList
            data={properties}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            renderItem={({ item }) => (
              <LocationCard property={item} onClick={() => handleClick(item)} />
            )}
          />
        </ModalView>
      </CenteredView>
    </ModalStyled>
  );
};
