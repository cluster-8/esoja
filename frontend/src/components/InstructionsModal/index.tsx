import React from 'react';
import { Text,Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PictureContainer } from '../../screens/CreatePlot/PicturePhotos/styles';
import { translate } from '../../data/I18n';

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
    setModalVisible();
    goToSelectImage();
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
          <TitleStyled>{translate("InstructionsModal.title")}</TitleStyled>
          <PictureContainer >
            <InstructionsImage />
          </PictureContainer>
          <TextInstructions>
            - {translate("InstructionsModal.frameWholePlant")}
            {"\n"}
            - {translate("InstructionsModal.tidyUpPlant")}
            {"\n"}
            - {translate("InstructionsModal.doNotUseGreenBackground")}
          </TextInstructions>
          <Text>
            {"\n"}
          </Text>
          <Button title={translate("InstructionsModal.understood")} onPress={handleClick} />
          </ScrollView>
        </ModalView>
      </FullView>
    </ModalStyled>
  );
};
