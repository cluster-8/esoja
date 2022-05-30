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
  StepSevenHelperImage
} from './styles';

import StepSeven from '../../../assets/plot-steps-images/StepSample.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepSevenScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';

const userLogin = yup.object().shape({
  grainsPlant1: yup
    .number()
    .required('CreatePlotStepSeven.errors.grainsPlant.required')
    .min(1, 'CreatePlotStepSeven.errors.grainsPlant.min'),
  grainsPlant2: yup
    .number()
    .required('CreatePlotStepSeven.errors.grainsPlant.required')
    .min(1, 'CreatePlotStepSeven.errors.grainsPlant.min')
});

export const CreatePlotStepSeven: React.FC<
  CreatePlotStepSevenScreenRouteProps
> = ({ navigation }) => {
  const { saveStep, getPersistedData } = useSample();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue('grainsPlant1', data?.plantB?.grainsPlant1?.toString() || '');
        setValue('grainsPlant2', data?.plantB?.grainsPlant2?.toString() || '');
        setValue('description', data?.plantB?.description || '');
      }
    });
  }, [getPersistedData, setValue]);

  const handleSubmitStepSeven = (data: FieldValues) => {
    const sample = {
      plantB: {
        grainsPlant1: data.grainsPlant1,
        grainsPlant2: data.grainsPlant2,
        description: data.description
      }
    };
    saveStep(sample);
    navigation.navigate('CreatePlotStepEight');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('CreatePlotStepSeven.title')}
          subtitle={translate('CreatePlotStepSeven.subtitle')}
        />
        <StepIndicator step={1} indicator={6} />
        <FormContainer>
          <HelperImageContainer>
            <StepSevenHelperImage source={StepSeven} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label='CreatePlotStepSeven.sampleA'
            placeholder={translate('CreatePlotStepSeven.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant1"
            control={control}
            errorMessage={errors?.grainsPlant1?.message}
          />
          <TextInput
            label='CreatePlotStepSeven.sampleB'
            placeholder={translate('CreatePlotStepSeven.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant2"
            control={control}
            errorMessage={errors?.grainsPlant2?.message}
          />
          <TextInput
            label='CreatePlotStepSeven.sampleDescription'
            placeholder={translate('CreatePlotStepSeven.sampleDescriptionPlaceholder')}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepSeven.buttonTitle')}
              onPress={handleSubmit(handleSubmitStepSeven)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
