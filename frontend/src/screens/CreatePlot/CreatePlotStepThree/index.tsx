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
  StepThreeHelperImage
} from './styles';

import StepThree from '../../../assets/plot-steps-images/StepThree.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepThreeScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { useSample } from '../../../hooks/useSample';

const stepThree = yup.object().shape({
  metersBetweenPlants: yup
    .number()
    .required('Distancia é obrigatória')
    .min(1, 'Distancia deve ser maior que "ZERO"')
});

export const CreatePlotStepThree: React.FC<
  CreatePlotStepThreeScreenRouteProps
> = ({ navigation }) => {
  const { saveStep, getPersistedData } = useSample();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(stepThree)
  });

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue(
          'metersBetweenPlants',
          data?.metersBetweenPlants?.toString() || ''
        );
      }
    });
  }, [getPersistedData, setValue]);
  const handleSubmitStepThree = (data: FieldValues) => {
    saveStep(data);
    navigation.navigate('CreatePlotStepFour');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title="Distancia linhas de plantio"
          subtitle="Informe a distância entre as linhas de plantio em centímetros"
        />
        <StepIndicator step={1} indicator={2} />
        <FormContainer>
          <HelperImageContainer>
            <StepThreeHelperImage source={StepThree} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="Distancia entre linhas"
            placeholder="Digite a distancia em cm"
            icon="check-square"
            keyboardType="numeric"
            name="metersBetweenPlants"
            control={control}
            errorMessage={errors?.metersBetweenPlants?.message}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSubmitStepThree)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
