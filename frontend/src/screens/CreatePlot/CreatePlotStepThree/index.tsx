import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepThree from '../../../assets/plot-steps-images/StepThree.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { CreatePlotStepThreeScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepThreeHelperImage
} from './styles';

const stepThree = yup.object().shape({
  metersBetweenPlants: yup
    .number()
    .required('Distancia é obrigatória')
    .min(1, 'Distancia deve ser maior que "ZERO"')
});

export const CreatePlotStepThree: React.FC<
  CreatePlotStepThreeScreenRouteProps
> = ({ navigation, route }) => {
  const { cultiveId } = route.params;
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
    data.cultiveId = cultiveId;
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
        <StepIndicator step={0} indicator={1} />
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
