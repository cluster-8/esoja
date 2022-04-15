import React from 'react';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton
} from './styles';
import * as yup from 'yup';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepNineScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

const userLogin = yup.object().shape({
  sampleA: yup.string().required('Quantidade é obrigatória'),
  sampleB: yup.string().required('Quantidade é obrigatória')
});

export const CreatePlotStepNine: React.FC<
  CreatePlotStepNineScreenRouteProps
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  const handleSubmitStepNine = (data: FieldValues) => {
    navigation.navigate('CreatePlotStepNine');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={'Imagem das amostras'}
          subtitle={'Tire uma foto de todas as plantas usadas nas amostras'}
        />
        <StepIndicator step={2} indicator={7} />
        <FormContainer>
          <HelperImageContainer></HelperImageContainer>
          <NextStepButton>
            <Button
              title={'Finalizar'}
              onPress={handleSubmit(handleSubmitStepNine)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
