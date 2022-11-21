import React, {  useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../../components/Button';
import { PictureInput } from '../../../components/PictureInput';
import { StepIndicator } from '../../../components/StepIndicator';
import { InstructionsModal } from '../../../components/InstructionsModal';

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
  const [image, setImage] = useState({base64:'',uri:""});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { setPersistedGrains,saveImage } = useSample();


  const { selectImage } = useUpload();

  const handleSelectImage = async () => {
    const image:{uri:string,base64:string} = await selectImage();
    if(!image){
      errorNoAccess();
      return;
    }
    setImage(image);
  };

  const errorNoAccess = ()=>{
    Alert.alert(
        translate("error.cameraAccessDenial.title"),
        translate("error.cameraAccessDenial.description")
      );
  }

  const handlePicturePhotos = async () => {
    setLoading(true);
    try {
      await saveImage(image.base64)
    } catch (error: any) {
      console.log(error.message);
    }
    
    try {   
      //console.log(image.base64)
      await setPersistedGrains(image.base64.toString());
      navigation.navigate('SampleOne');
    } catch (err) {
      setLoading(false);
      Alert.alert('Numberplants.alert'
      );
      console.log(err)
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
                  onPress={() => setModalVisible(!modalVisible)}
                  uri={image.uri}
                />
              </PictureContainer>
              <NextStepButton>
                <Button
                  title={translate("PicturePhotos.finishButton")}
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
      <InstructionsModal modalVisible={modalVisible} goToSelectImage={handleSelectImage} setModalVisible={()=>setModalVisible(!modalVisible)}  />
    </ScrollView>
  );
};
