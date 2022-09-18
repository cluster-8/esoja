import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepSeven from '../../../assets/plot-steps-images/StepSample.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { SampleOneScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepSevenHelperImage
} from './styles';

const userLogin = yup.object().shape({
  grainsPlant1: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'Quantidade de grãos não pode ser "ZERO"'),
  grainsPlant2: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'Quantidade de grãos não pode ser "ZERO"')
});

export const SampleTwo: React.FC<
  SampleOneScreenRouteProps
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
    const sample: any = {
      plantB: {
        grainsPlant1: data.grainsPlant1,
        grainsPlant2: data.grainsPlant2
      }
    };
    if (data?.description) {
      sample.plantB.description = data.description;
    }
    saveStep(sample);
    navigation.navigate('SampleTwo');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('SampleTwo.title')}
          subtitle={translate('SampleTwo.subtitle')}
        />
        <StepIndicator step={1} indicator={5} />
        <FormContainer>
          <HelperImageContainer>
            <StepSevenHelperImage source={StepSeven} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="SampleTwo.sampleA"
            placeholder={translate('SampleTwo.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant1"
            control={control}
            errorMessage={errors?.grainsPlant1?.message}
          />
          <TextInput
            label="SampleTwo.sampleB"
            placeholder={translate('SampleTwo.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant2"
            control={control}
            errorMessage={errors?.grainsPlant2?.message}
          />
          <TextInput
            label="SampleTwo.sampleDescription"
            placeholder={translate(
              'SampleTwo.sampleDescriptionPlaceholder'
            )}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title={translate('SampleTwo.buttonTitle')}
              onPress={handleSubmit(handleSubmitStepSeven)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
