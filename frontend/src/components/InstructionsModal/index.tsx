import React from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native-paper';
import { Property } from '../../data/Model/Property';
import { PictureContainer } from '../../screens/CreatePlot/PicturePhotos/styles';
import { PictureInput } from '../PictureInput';
import {
  FullView,
  ModalStyled,
  ModalView,
  TitleStyled,
  InstructionsImage
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
      <FullView>
        <ModalView>
          <Button title='Entendido' onPress={setModalVisible} />
          <TitleStyled>Instruções foto</TitleStyled>
          <PictureContainer >
            <InstructionsImage />
          </PictureContainer>
          <Text>Texto com instruções</Text>
        </ModalView>
      </FullView>
    </ModalStyled>
  );
};
