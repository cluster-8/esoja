import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { translate } from '../../../data/I18n';
import * as yup from 'yup';
import StepFour from '../../../assets/plot-steps-images/StepFour.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { CreatePlotStepFourScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepFourHelperImage
} from './styles';




const stepFour = yup.object().shape({
  plantsPerMeter: yup
    .number()
    .required('CreatePlotStepFour.erros.plantsPerMeter.required')
    .min(1, 'CreatePlotStepFour.erros.plantsPerMeter.min')
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
          title={translate('CreatePlotStepFour.title')}
          subtitle={translate('CreatePlotStepFour.subtitle')}
        />
        <StepIndicator step={1} indicator={2} />
        <FormContainer>
          <HelperImageContainer>
            <StepFourHelperImage source={StepFour} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label='CreatePlotStepFour.plantsNumber'
            placeholder={translate('CreatePlotStepFour.plantsNumberPlaceholder')}
            icon="check-square"
            keyboardType="numeric"
            name="plantsPerMeter"
            control={control}
            errorMessage={errors?.plantsPerMeter?.message}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepFour.continueButton')}
              onPress={handleSubmit(handleSubmitStepFour)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
