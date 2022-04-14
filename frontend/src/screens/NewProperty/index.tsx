import React, { useState } from 'react';
import { Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, Container, Header, MenuContainer, FormContainer, AvatarField, ButtonContainer } from './styles';

import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { PictureInput } from '../../components/PictureInput';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import validators from '../../data/I18n/validators';

const schema = Yup.object().shape({
  name: Yup.string().required('validators.nameRequired'),
  cep: Yup.string()
    .matches(/^[0-9]+$/, 'validators.cep')
    .min(8, 'validators.cepLength')
    .max(8, 'validators.cepLength')
    .required('validators.required')
});

export const NewProperty: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  });

  async function handleRegister(data: { [x: string]: string }) {
    try {
      setLoading(true);
      console.log(data);
      reset();
      Alert.alert('Cadastro efetuado com sucesso!');
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar.');
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title title={translate('newProperty.newProperty')} subtitle={translate('newProperty.newPropertySubtitle')} />
        </Header>

        <MenuContainer>
          <FormContainer>
            <AvatarField>
              <PictureInput placeholder="" updatePictureLabel="" onPress={() => console.log('apertou')} />
            </AvatarField>
            <TextInput
              label={translate('newProperty.propertyNameLabel')}
              name="name"
              control={control}
              icon="home"
              placeholder={translate('newProperty.propertyNamePlaceholder')}
              autoCapitalize="sentences"
              autoCorrect={false}
              errorMessage={errors.name && errors.name.message}
            />
            <TextInput
              label="Nome"
              name="cep"
              control={control}
              icon="map-pin"
              placeholder="Digite o CEP da propriedade"
              keyboardType="numeric"
              errorMessage={errors.cep && errors.cep.message}
            />
            <ButtonContainer>
              <Button title="Enviar" onPress={handleSubmit(handleRegister)} showLoadingIndicator={loading} />
            </ButtonContainer>
          </FormContainer>
        </MenuContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
