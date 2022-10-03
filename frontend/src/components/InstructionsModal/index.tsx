import React from 'react';
import { Text,Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PictureContainer } from '../../screens/CreatePlot/PicturePhotos/styles';

import {
  FullView,
  ModalStyled,
  ModalView,
  TitleStyled,
  InstructionsImage,
  TextInstructions,
  
} from './styles';

export interface InstructionsModalProps {
  modalVisible: boolean;
  setModalVisible: () => unknown;
  goToSelectImage:() =>unknown;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  modalVisible = false,
  setModalVisible,
  goToSelectImage
}) => {
  const handleClick = () => {
    goToSelectImage();
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
          <ScrollView>
          <TitleStyled>Instruções</TitleStyled>
          <PictureContainer >
            <InstructionsImage />
          </PictureContainer>
          <TextInstructions>
            - Tenha certeza de enquadrar a planta toda na foto
            {"\n"}
            - Arrume a planta de forma que todas as vagens sejam visiveis
            {"\n"}
            - Coloque a soja sobre um plano de cor que não seja verde
          </TextInstructions>
          <Text>
            {"\n"}
          </Text>
          <Button title='Entendido' onPress={handleClick} />
          </ScrollView>
        </ModalView>
      </FullView>
    </ModalStyled>
  );
};
