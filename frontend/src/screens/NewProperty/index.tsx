import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, Keyboard, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { PictureInput } from '../../components/PictureInput';
import { TextInput } from '../../components/TextInput';
import { TextInputMask } from '../../components/TextInputMask';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from '../../hooks/useLocation';
import { useProperty } from '../../hooks/useProperty';
import { useUpload } from '../../hooks/useUpload';
import {
  AvatarField,
  ButtonContainer,
  Container,
  FormContainer,
  Header,
  MenuContainer,
  OrText,
  TouchableWithoutFeedback,
  ZipCodeContainer
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('validators.nameRequired'),
  zipcode: Yup.string().required('validators.required').min(9).max(9)
});

export const NewProperty: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [getPositionLoading, setGetPositionLoading] = useState(false);
  const [image, setImage] = useState('');

  const { pictureUpload, selectImage } = useUpload();
  const { getCoordinates, getGeoCode, getZipcode } = useLocation();
  const { createPorperty } = useProperty();
  const { authUser } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setImage(uri);
  };

  const handleGetCurrentPosition = async () => {
    setGetPositionLoading(true);
    const coords = await getCoordinates();
    setValue('zipcode', await getZipcode(coords));
    setValue('latitude', coords.latitude);
    setValue('longitude', coords.longitude);
    setGetPositionLoading(false);
  };

  async function handleRegister(data: FieldValues) {
    try {
      setLoading(true);
      if (image) {
        const picture = await pictureUpload(image, 'properties');
        data.picture = picture;
      }
      if (!data?.latitude) {
        const { latitude, longitude } = await getGeoCode(data.zipcode);
        data.latitude = latitude;
        data.longitude = longitude;
      }
      data.userId = authUser?.id;
      await createPorperty(data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Não foi possível salvar.');
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title
              title={translate('newProperty.newProperty')}
              subtitle={translate('newProperty.newPropertySubtitle')}
            />
          </Header>

          <MenuContainer>
            <FormContainer>
              <AvatarField>
                <PictureInput
                  placeholder="Adicionar imagem"
                  updatePictureLabel="Alterar imagem"
                  onPress={handleSelectImage}
                  uri={image}
                />
              </AvatarField>
              <TextInput
                label="newProperty.propertyNameLabel"
                name="name"
                control={control}
                icon="home"
                placeholder={translate('newProperty.propertyNamePlaceholder')}
                autoCapitalize="sentences"
                autoCorrect={false}
                errorMessage={errors?.name?.message}
              />
              <ZipCodeContainer>
                <TextInputMask
                  mask="99999-999"
                  label="Nome"
                  name="zipcode"
                  control={control}
                  icon="map-pin"
                  placeholder="Digite o CEP da propriedade"
                  keyboardType="numeric"
                  errorMessage={errors?.zipcode?.message}
                />
                <OrText>Ou</OrText>
                <Button
                  type="secondary"
                  title="Pegar minha posição atual"
                  onPress={handleGetCurrentPosition}
                  showLoadingIndicator={getPositionLoading}
                />
              </ZipCodeContainer>
              <ButtonContainer>
                <Button
                  title="Enviar"
                  onPress={handleSubmit(handleRegister)}
                  showLoadingIndicator={loading}
                />
              </ButtonContainer>
            </FormContainer>
          </MenuContainer>
        </Container>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
