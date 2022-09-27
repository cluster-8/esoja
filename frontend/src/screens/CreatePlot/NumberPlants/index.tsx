import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepFour from '../../../assets/plot-steps-images/StepFour.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { NumberPlantsScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepFourHelperImage
} from './styles';

const numberPlants = yup.object().shape({
  plantsPerMeter: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'Quantidade deve ser maior que "ZERO"')
});

//Passo 4 ou 2B
export const NumberPlants: React.FC<
  NumberPlantsScreenRouteProps
> = ({ navigation }) => {
  const { saveStep, getPersistedData } = useSample();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(numberPlants)
  });

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue('plantsPerMeter', data?.plantsPerMeter?.toString() || '');
      }
    });
  }, [getPersistedData, setValue]);

  const handleNumberPlants = (data: FieldValues) => {
    saveStep(data);
    navigation.navigate('SampleExtraction');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('NumberPlants.title')}
          subtitle={translate('NumberPlants.subtitle')}
        />
        <StepIndicator step={1} indicator={1} />
        <FormContainer>
          <HelperImageContainer>
            <StepFourHelperImage source={StepFour} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="NumberPlants.plantsNumber"
            placeholder={translate(
              'NumberPlants.plantsNumberPlaceholder'
            )}
            icon="check-square"
            keyboardType="numeric"
            name="plantsPerMeter"
            control={control}
            errorMessage={errors?.plantsPerMeter?.message}
          />
          <NextStepButton>
            <Button
              title={translate('NumberPlants.continueButton')}
              onPress={handleSubmit(handleNumberPlants)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
