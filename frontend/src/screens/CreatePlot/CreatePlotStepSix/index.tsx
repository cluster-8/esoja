import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { translate } from 'i18n-js';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepSix from '../../../assets/plot-steps-images/StepSample.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { CreatePlotStepSixScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepSixHelperImage
} from './styles';

const userLogin = yup.object().shape({
  grainsPlant1: yup
    .number()
    .required('CreatePlotStepSix.errors.grainsPlant.required')
    .min(1, 'CreatePlotStepSix.errors.grainsPlant.min'),
  grainsPlant2: yup
    .number()
    .required('CreatePlotStepSix.errors.grainsPlant.required')
    .min(1, 'CreatePlotStepSix.errors.grainsPlant.min')
});

export const CreatePlotStepSix: React.FC<CreatePlotStepSixScreenRouteProps> = ({
  navigation
}) => {
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
        setValue('grainsPlant1', data?.plantA?.grainsPlant1?.toString() || '');
        setValue('grainsPlant2', data?.plantA?.grainsPlant2?.toString() || '');
        setValue('metersBetweenPlants', data?.plantA?.description || '');
      }
    });
  }, [getPersistedData, setValue]);

  const handleSubmitStepSix = (data: FieldValues) => {
    const sample = {
      plantA: {
        grainsPlant1: data.grainsPlant1,
        grainsPlant2: data.grainsPlant2,
        description: data.description
      }
    };
    saveStep(sample);
    navigation.navigate('CreatePlotStepSeven');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('CreatePlotStepSix.title')}
          subtitle={translate('CreatePlotStepSix.subtitle')}
        />
        <StepIndicator step={1} indicator={5} />
        <FormContainer>
          <HelperImageContainer>
            <StepSixHelperImage source={StepSix} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label='CreatePlotStepSix.sampleA'
            placeholder={translate('CreatePlotStepSix.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant1"
            control={control}
            errorMessage={errors?.grainsPlant1?.message}
          />
          <TextInput
            label='CreatePlotStepSix.sampleB'
            placeholder={translate('CreatePlotStepSix.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant2"
            control={control}
            errorMessage={errors?.grainsPlant2?.message}
          />
          <TextInput
            label='CreatePlotStepSix.sampleDescription'
            placeholder={translate('CreatePlotStepSix.sampleDescriptionPlaceholder')}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepSix.buttonTitle')}
              onPress={handleSubmit(handleSubmitStepSix)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
