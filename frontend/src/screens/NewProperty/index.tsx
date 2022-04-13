import React, { useState } from 'react';
import { Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import {
  TouchableWithoutFeedback,
  Container,
  Header,
  Title,
  SubTitle,
  MenuContainer,
  Form,
  Fields,
  AvatarField,
} from './styles';

import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { PictureInput } from "../../components/PictureInput";

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  cep: Yup
    .string()
    .matches(/^[0-9]+$/, 'O CEP precisa conter apenas números.')
    .min(8, 'O CEP precisa precisa possuir 8 dígitos.')
    .max(8, 'O CEP precisa precisa possuir 8 dígitos.')
    .required('O valor é obrigatório.')
})

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
      Alert.alert("Cadastro efetuado com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar.");
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Propriedade</Title>

          <SubTitle>Informe o nome e o CEP da propriedade.</SubTitle>
        </Header>

        <MenuContainer>
          <Form>
            <Fields>
              <AvatarField>
                <PictureInput
                  placeholder=""
                  updatePictureLabel=""
                  onPress={() => console.log('apertou')}
                />
              </AvatarField>

              <TextInput
                name="name"
                control={control}
                icon="home"
                placeholder="Digite o nome da propriedade"
                autoCapitalize="sentences"
                autoCorrect={false}
                errorMessage={errors.name && errors.name.message}
              />

              <TextInput
                name="cep"
                control={control}
                icon="map-pin"
                placeholder="Digite o CEP da propriedade"
                keyboardType="numeric"
                errorMessage={errors.cep && errors.cep.message}
              />
            </Fields>

            <Button
              title="Enviar"
              onPress={handleSubmit(handleRegister)}
              showLoadingIndicator={loading}
            />
          </Form>
        </MenuContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
