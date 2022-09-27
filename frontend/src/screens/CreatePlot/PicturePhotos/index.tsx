import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../../components/Button';
import { PictureInput } from '../../../components/PictureInput';
import { StepIndicator } from '../../../components/StepIndicator';
import Title from '../../../components/Title';
import { PicturePhotosScreenRouteProps } from '../../../data/routes/app';
import { useAuth } from '../../../hooks/useAuth';
import { useSample } from '../../../hooks/useSample';
import { useUpload } from '../../../hooks/useUpload';
import { translate } from '../../../data/I18n';
import {
  Container,
  FormContainer,
  NextStepButton,
  NoNetworkMessage,
  PictureContainer
} from './styles';

//Passo 6 ou 4B
export const PicturePhotos: React.FC<
  PicturePhotosScreenRouteProps
> = ({ navigation }) => {
  const { isConnected } = useAuth();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { createSample } = useSample();
  const { selectImage } = useUpload();

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setImage(uri);
  };

  const handlePicturePhotos = async () => {
    setLoading(true);
    try {
      await createSample(image);
      navigation.navigate('SampleOne');
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Erro ao cadastrar',
        'Não foi possivel cadastrar as amostras'
      );
    }
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('PicturePhotos.title')}
          subtitle={translate('PicturePhotos.subtitle')}
        />
        <StepIndicator step={1} indicator={3} />
        <FormContainer>
          {isConnected ? (
            <>
              <PictureContainer>
                <PictureInput
                  model="RETANGLE"
                  placeholder="PicturePhotos.imagePlaceholder"
                  updatePictureLabel="PicturePhotos.imageUpdatePictureLabel"
                  onPress={handleSelectImage}
                  uri={image}
                />
              </PictureContainer>
              <NextStepButton>
                <Button
                  title="Finalizar"
                  onPress={handlePicturePhotos}
                  showLoadingIndicator={loading}
                />
              </NextStepButton>
            </>
          ) : (
            <>
              <NoNetworkMessage>
                Você não possui conexão com a internet no momento, retire a foto
                e deixe salva em seu dispositivo e quando tiver com conexão
                retorne nesta etapa para finalizar o cadastro, Os dados
                coletados até este ponto não serão perdidos se sair dessa tela
              </NoNetworkMessage>
              <NextStepButton>
                <Button
                  title="Ir para Menu principal"
                  onPress={() => navigation.navigate('Home')}
                  showLoadingIndicator={loading}
                />
              </NextStepButton>
            </>
          )}
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
