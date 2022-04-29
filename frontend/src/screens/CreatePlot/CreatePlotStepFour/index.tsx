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
  StepFourHelperImage
} from './styles';

import StepFour from '../../../assets/plot-steps-images/StepFour.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepFourScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { useSample } from '../../../hooks/useSample';

const stepFour = yup.object().shape({
  plantsPerMeter: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'Quantidade deve ser maior que "ZERO"')
});

export const CreatePlotStepFour: React.FC<
  CreatePlotStepFourScreenRouteProps
> = ({ navigation }) => {
  const { saveStep, getPersistedData } = useSample();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(stepFour)
  });

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue('plantsPerMeter', data?.plantsPerMeter?.toString() || '');
      }
    });
  }, [getPersistedData, setValue]);

  const handleSubmitStepFour = (data: FieldValues) => {
    saveStep(data);
    navigation.navigate('CreatePlotStepFive');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title="Quantidade de plantas"
          subtitle={'Informe a quantidade de plantas em "2 metros" lineares'}
        />
        <StepIndicator step={1} indicator={3} />
        <FormContainer>
          <HelperImageContainer>
            <StepFourHelperImage source={StepFour} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="Platas em 2 metros"
            placeholder="Digite a quantidade de plantas"
            icon="check-square"
            keyboardType="numeric"
            name="plantsPerMeter"
            control={control}
            errorMessage={errors?.plantsPerMeter?.message}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSubmitStepFour)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
