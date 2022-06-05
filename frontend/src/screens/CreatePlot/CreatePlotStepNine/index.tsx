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
import { hasConnection } from '../../../utils/hasConnection';
import {
  Container,
  FormContainer,
  NextStepButton,
  NoNetworkMessage,
  PictureContainer
} from './styles';

export const CreatePlotStepNine: React.FC<
  CreatePlotStepNineScreenRouteProps
> = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const { createSample } = useSample();
  const { selectImage } = useUpload();

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setImage(uri);
  };

  const handleSubmitStepNine = async () => {
    setLoading(true);
    try {
      await createSample(image);
      navigation.navigate('Plots');
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Erro ao cadastrar',
        'Não foi possivel cadastrar as amostras'
      );
    }
  };
  useEffect(() => {
    hasConnection().then(connection => setIsConnected(connection));
  }, []);

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('CreatePlotStepNine.title')}
          subtitle={translate('CreatePlotStepNine.subtitle')}
        />
        <StepIndicator step={2} indicator={8} />
        <FormContainer>
          {isConnected ? (
            <>
              <PictureContainer>
                <PictureInput
                  model="RETANGLE"
                  placeholder={translate('CreatePlotStepNine.imagePlaceholder')}
                  updatePictureLabel='CreatePlotStepNine.imadeUpdatePictureLabel'
                  onPress={handleSelectImage}
                  uri={image}
                />
              </PictureContainer>
              <NextStepButton>
                <Button
                  title={translate('CreatePlotStepNine.finishButton')}
                  onPress={handleSubmitStepNine}
                  showLoadingIndicator={loading}
                />
              </NextStepButton>
            </>
          ) : (
            <>
              <NoNetworkMessage>
                {translate('CreatePlotStepNine.noNetwork')}
              </NoNetworkMessage>
              <NextStepButton>
                <Button
                  title={translate('CreatePlotStepNine.nextStepButton')}
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
