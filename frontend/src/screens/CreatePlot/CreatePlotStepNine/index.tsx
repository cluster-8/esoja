import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '../../../components/Button';
import { PictureInput } from '../../../components/PictureInput';
import { StepIndicator } from '../../../components/StepIndicator';
import Title from '../../../components/Title';
import { CreatePlotStepNineScreenRouteProps } from '../../../data/routes/app';
import { useUpload } from '../../../hooks/useUpload';
import {
  Container,
  FormContainer,
  NextStepButton,
  PictureContainer
} from './styles';

export const CreatePlotStepNine: React.FC<
  CreatePlotStepNineScreenRouteProps
> = ({ navigation }) => {
  const [image, setImage] = useState('');

  const { pictureUpload, selectImage } = useUpload();

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setImage(uri);
  };

  const handleSubmitStepNine = async () => {
    const url = await pictureUpload(image, 'sample');
    console.log(url);

    navigation.navigate('Home');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title="Imagem das amostras"
          subtitle="Tire uma foto de todas as plantas usadas nas amostras"
        />
        <StepIndicator step={2} indicator={7} />
        <FormContainer>
          <PictureContainer>
            <PictureInput
              model="RETANGLE"
              placeholder="Adicionar imagem"
              updatePictureLabel="Alterar imagem"
              onPress={handleSelectImage}
              uri={image}
            />
          </PictureContainer>
          <NextStepButton>
            <Button title="Finalizar" onPress={handleSubmitStepNine} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
