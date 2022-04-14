import React from 'react';
import { Container, FormContainer, HelperImageContainer, NextStepButton, StepSevenHelperImage } from './styles';
import * as yup from 'yup';

import StepSeven from '../../../assets/plot-steps-images/StepSample.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepSevenScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

const userLogin = yup.object().shape({
  sampleA: yup.string().required('Quantidade é obrigatória'),
  sampleB: yup.string().required('Quantidade é obrigatória')
});

export const CreatePlotStepSeven: React.FC<CreatePlotStepSevenScreenRouteProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  const handleSubmitStepSeven = (data: FieldValues) => {
    navigation.navigate('CreatePlotStepEight');
  };

  return (
    <ScrollView>
      <Container>
        <Title title={'Amostra 2'} subtitle={'Repita o passo anterior, em outro ponto do talhão'} />
        <StepIndicator step={1} indicator={6} />
        <FormContainer>
          <HelperImageContainer>
            <StepSevenHelperImage source={StepSeven} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="Quantidade total de grãos na planta A"
            placeholder="Digite a quantidade de grãos"
            icon="check-square"
            name="sampleA"
            control={control}
            errorMessage={errors?.sampleA?.message}
          />
          <TextInput
            label="Quantidade total de grãos na planta B"
            placeholder="Digite a quantidade de grãos"
            icon="check-square"
            name="sampleB"
            control={control}
            errorMessage={errors?.sampleB?.message}
          />
          <TextInput
            label="Descrição (opicional)"
            placeholder="Descreva aqui..."
            icon="check-square"
            name="descriptionSample1"
            control={control}
          />
          <NextStepButton>
            <Button title={'Continuar'} onPress={handleSubmit(handleSubmitStepSeven)} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
