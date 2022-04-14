import React from 'react';
import { Container, FormContainer, HelperImageContainer, NextStepButton, StepTwoHelperImage } from './styles';
import * as yup from 'yup';

import StepTwo from '../../../assets/plot-steps-images/StepTwo.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepTwoScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

const userLogin = yup.object().shape({
  name: yup.string().required('Nome é obrigatório')
});

export const CreatePlotStepTwo: React.FC<CreatePlotStepTwoScreenRouteProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  const handleSubmitStepTwo = (data: FieldValues) => {
    navigation.navigate('CreatePlotStepThree');
  };

  return (
    <ScrollView>
      <Container>
        <Title title={'Identitifique o talhão'} subtitle={'Insira um nome e uma descrição para o seu novo talhão'} />
        <StepIndicator step={1} />
        <FormContainer>
          <HelperImageContainer>
            <StepTwoHelperImage source={StepTwo} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="Nome"
            placeholder="Digite um nome para o talhão"
            icon="check-square"
            name="name"
            control={control}
            errorMessage={errors?.name?.message}
          />
          <TextInput
            label="Descrição"
            placeholder="Digite uma descrição"
            icon="check-square"
            secureTextEntry
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button title={'Continuar'} onPress={handleSubmit(handleSubmitStepTwo)} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
