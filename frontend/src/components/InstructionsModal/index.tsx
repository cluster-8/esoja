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

export interface InstructionsModalProps {
  modalVisible: boolean;
  setModalVisible: () => unknown;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  modalVisible = false,
  setModalVisible,
}) => {
  const handleClick = (item: Property) => {
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
