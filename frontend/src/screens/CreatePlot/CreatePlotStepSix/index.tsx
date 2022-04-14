import React from 'react';
import { Container, FormContainer, HelperImageContainer, NextStepButton, StepSixHelperImage } from './styles';
import * as yup from 'yup';

import StepSix from '../../../assets/plot-steps-images/StepSample.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepSixScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

const userLogin = yup.object().shape({
  sampleA: yup.string().required('Quantidade é obrigatória'),
  sampleB: yup.string().required('Quantidade é obrigatória')
});

export const CreatePlotStepSix: React.FC<CreatePlotStepSixScreenRouteProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  const handleSubmitStepSix = (data: FieldValues) => {
    navigation.navigate('CreatePlotStepSeven');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={'Amostra 1'}
          subtitle={'Colete duas plantas de um ponto aleatorio do talhão \n (guarde as plantas para o ultimo passo)'}
        />
        <StepIndicator step={1} indicator={5} />
        <FormContainer>
          <HelperImageContainer>
            <StepSixHelperImage source={StepSix} resizeMode="contain" />
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
            <Button title={'Continuar'} onPress={handleSubmit(handleSubmitStepSix)} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
