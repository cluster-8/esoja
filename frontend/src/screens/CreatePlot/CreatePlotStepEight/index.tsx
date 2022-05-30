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
  StepEightHelperImage
} from './styles';

import StepEight from '../../../assets/plot-steps-images/StepSample.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepEightScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';

const userLogin = yup.object().shape({
  grainsPlant1: yup
    .number()
    .required('CreatePlotStepEight.errors.grainsPlant.required')
    .min(1, 'CreatePlotStepEight.errors.garinsPlant.min'),
  grainsPlant2: yup
    .number()
    .required('CreatePlotStepEight.errors.grainsPlant.required')
    .min(1, 'CreatePlotStepEight.errors.grainsPlant.min')
});

export const CreatePlotStepEight: React.FC<
  CreatePlotStepEightScreenRouteProps
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
        setValue('grainsPlant1', data?.plantC?.grainsPlant1?.toString() || '');
        setValue('grainsPlant2', data?.plantC?.grainsPlant2?.toString() || '');
        setValue('description', data?.plantC?.description || '');
      }
    });
  }, [getPersistedData, setValue]);

  const handleSubmitStepEight = (data: FieldValues) => {
    const sample = {
      plantC: {
        grainsPlant1: data.grainsPlant1,
        grainsPlant2: data.grainsPlant2,
        description: data.description
      }
    };
    saveStep(sample);
    navigation.navigate('CreatePlotStepNine');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('CreatePlotStepEight.title')}
          subtitle={translate('CreatePlotStepEight.subtitle')}
        />
        <StepIndicator step={1} indicator={7} />
        <FormContainer>
          <HelperImageContainer>
            <StepEightHelperImage source={StepEight} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label='CreatePlotStepEight.sampleA'
            placeholder={translate('CreatePlotStepEight.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant1"
            control={control}
            errorMessage={errors?.grainsPlant1?.message}
          />
          <TextInput
            label='CreatePlotStepEight.sampleB'
            placeholder={translate('CreatePlotStepEight.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant2"
            control={control}
            errorMessage={errors?.grainsPlant2?.message}
          />
          <TextInput
            label='CreatePlotStepEight.sampleDescription'
            placeholder={translate('CreatePlotStepEight.sampleDescriptionPlaceholder')}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepEight.buttonTitle')}
              onPress={handleSubmit(handleSubmitStepEight)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
