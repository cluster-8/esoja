import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../../components/Button';
import { PictureInput } from '../../../components/PictureInput';
import { StepIndicator } from '../../../components/StepIndicator';
import { translate } from '../../../data/I18n';
import Title from '../../../components/Title';
import { CreatePlotStepNineScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
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
  const [loading, setLoading] = useState(false);

  const { saveStep, getPersistedData, createPlot } = useSample();
  const { selectImage } = useUpload();

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setImage(uri);
  };

  const handleSubmitStepNine = async () => {
    setLoading(true);
    try {
      await saveStep({ photo: image });
      await createPlot();
      await navigation.navigate('Plots');
    } catch (err) {
      setLoading(false);
      console.log(err);

      Alert.alert('erro');
    }
  };

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setImage(data?.photo || '');
      }
    });
  }, [getPersistedData]);

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
            <Button
              title="Finalizar"
              onPress={handleSubmitStepNine}
              showLoadingIndicator={loading}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
