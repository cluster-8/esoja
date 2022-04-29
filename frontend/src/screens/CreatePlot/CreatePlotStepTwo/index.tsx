import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView } from 'react-native';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepTwoHelperImage
} from './styles';

import StepTwo from '../../../assets/plot-steps-images/StepTwo.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepTwoScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { useSample } from '../../../hooks/useSample';

const stepTwo = yup.object().shape({
  name: yup.string().required('Nome é obrigatório')
});

export const CreatePlotStepTwo: React.FC<CreatePlotStepTwoScreenRouteProps> = ({
  navigation
}) => {
  const { saveStep, getPersistedData } = useSample();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(stepTwo)
  });

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue('name', data?.name || '');
        setValue('description', data?.description || '');
      }
    });
  }, [getPersistedData, setValue]);

  const handleSubmitStepTwo = (data: FieldValues) => {
    saveStep(data);
    navigation.navigate('CreatePlotStepThree');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title="Identitifique o talhão"
          subtitle="Insira um nome e uma descrição para o seu novo talhão"
        />
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
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSubmitStepTwo)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
