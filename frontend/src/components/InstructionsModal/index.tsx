import React from 'react';
import { Property } from '../../data/Model/Property';
import {
  CenteredView,
  CloseButton,
  CloseButtonIcon,
  ModalStyled,
  ModalView,
  TitleStyled
} from './styles';

export interface PropertyModalProps {
  modalVisible: boolean;
  setModalVisible: () => unknown;
  setSelectedProperty: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  modalVisible = false,
  setModalVisible,
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
          <TitleStyled>Instruções foto</TitleStyled>
        </ModalView>
      </CenteredView>
    </ModalStyled>
  );
};
