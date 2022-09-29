import React, { useCallback, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../../components/Button';
import { PictureInput } from '../../../components/PictureInput';
import { StepIndicator } from '../../../components/StepIndicator';
import { PropertyModal } from '../../../components/PropertyModal';

import Title from '../../../components/Title';
import { PicturePhotosScreenRouteProps } from '../../../data/routes/app';
import { useAuth } from '../../../hooks/useAuth';
import { useSample } from '../../../hooks/useSample';
import { useUpload } from '../../../hooks/useUpload';
import { translate } from '../../../data/I18n';
import { Property } from '../../../data/Model/Property';

import {
  Container,
  FormContainer,
  NextStepButton,
  NoNetworkMessage,
  PictureContainer
} from './styles';
import { CenteredView, CloseButton, CloseButtonIcon, LocationList, ModalStyled, ModalView, TitleStyled } from '../../../components/PropertyModal/styles';

//Passo 6 ou 4B
export const PicturePhotos: React.FC<
  PicturePhotosScreenRouteProps
> = ({ navigation }) => {
  const { isConnected } = useAuth();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  const [propertyList, setPropertyList] = useState<Property[]>([]);

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
        'Error when registering',
        'Não foi possivel cadastrar as amostras'
      );
    }
  };

    const handleSelectProperty = useCallback(
    async (property: Property) => {
      console.log('aaaaaaaaa');
      
    },
    []
  );

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
                  onPress={() => setModalVisible(!modalVisible)}
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
                You do not have an internet connection. Save the image and try again later.
              </NoNetworkMessage>
              <NextStepButton>
                <Button
                  title={translate('PicturePhotos.menuPrincipal')}
                  onPress={() => navigation.navigate('Home')}
                  showLoadingIndicator={loading}
                />
              </NextStepButton>
            </>
          )}
        </FormContainer>
      </Container>
      <ModalStyled
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <CenteredView>
        <ModalView>
          <CloseButton onPress={()=>{setModalVisible(!modalVisible)}}>
            <CloseButtonIcon name="x-circle" />
          </CloseButton>
          <TitleStyled>modal</TitleStyled>
        </ModalView>
      </CenteredView>
    </ModalStyled>
    </ScrollView>
  );
};
