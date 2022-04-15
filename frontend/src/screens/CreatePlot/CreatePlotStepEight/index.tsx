import React from 'react';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepEightHelperImage
} from './styles';
import * as yup from 'yup';

import StepEight from '../../../assets/plot-steps-images/StepSample.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepEightScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

const userLogin = yup.object().shape({
  sampleA: yup.string().required('Quantidade é obrigatória'),
  sampleB: yup.string().required('Quantidade é obrigatória')
});

export const CreatePlotStepEight: React.FC<
  CreatePlotStepEightScreenRouteProps
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  const handleSubmitStepEight = (data: FieldValues) => {
    navigation.navigate('CreatePlotStepNine');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={'Amostra 3'}
          subtitle={'Repita o passo anterior, essa sera a ultima amostra'}
        />
        <StepIndicator step={1} indicator={7} />
        <FormContainer>
          <HelperImageContainer>
            <StepEightHelperImage source={StepEight} resizeMode="contain" />
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
            <Button
              title={'Continuar'}
              onPress={handleSubmit(handleSubmitStepEight)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
