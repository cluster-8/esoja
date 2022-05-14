import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { translate } from 'i18n-js';
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
  name: yup.string().required('CreatePlotStepTwo.errors.stepTwoName.required')
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
          title={translate('CreatePlotStepTwo.title')}
          subtitle={translate('CreatePlotStepTwo.subtitle')}
        />
        <StepIndicator step={1} />
        <FormContainer>
          <HelperImageContainer>
            <StepTwoHelperImage source={StepTwo} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label='CreatePlotStepTwo.fieldName'
            placeholder={translate('CreatePlotStepTwo.fieldNamePlaceholder')}
            icon="check-square"
            name="name"
            control={control}
            errorMessage={errors?.name?.message}
          />
          <TextInput
            label='CreatePlotStepTwo.fieldDescription'
            placeholder={translate('CreatePlotStepTwo.fieldDescriptionPlaceholder')}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepTwo.continueButton')}
              onPress={handleSubmit(handleSubmitStepTwo)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
