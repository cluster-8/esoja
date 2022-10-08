import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepSix from '../../../assets/plot-steps-images/StepSample.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { PicturePhotosScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepSixHelperImage
} from './styles';

const sampleOne = yup.object().shape({
  grainsPlant1: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'Quantidade de grãos não pode ser "ZERO"'),
  grainsPlant2: yup
    .number()
    .required('Quantidade é obrigatória')
    .min(1, 'Quantidade de grãos não pode ser "ZERO"')
});

//Passo 7 ou 5B
export const SampleOne: React.FC<PicturePhotosScreenRouteProps> = ({
  navigation
}) => {
  const { saveStep, getPersistedData,getGrainsEstimation } = useSample();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(sampleOne)
  });

  const handleCallAi = async ()=>{
    const grains = await getGrainsEstimation();
    setValue('grainsPlant1', grains.sampleOne.plant1.toString());
    setValue('grainsPlant2', grains.sampleOne.plant2.toString());
  }

  useEffect(() => {
    getPersistedData().then(data => {
      if (data?.plantA) {
        setValue('grainsPlant1', data?.plantA?.grainsPlant1?.toString() || '');
        setValue('grainsPlant2', data?.plantA?.grainsPlant2?.toString() || '');
        setValue('description', data?.plantA?.description || '');
      }else{
        handleCallAi();
      }
    });
  }, [getPersistedData, setValue]);

  const handleSampleOne = (data: FieldValues) => {
    const sample: any = {
      plantA: {
        grainsPlant1: data.grainsPlant1,
        grainsPlant2: data.grainsPlant2
      }
    };
    if (data?.description) {
      sample.plantA.description = data.description;
    }
    saveStep(sample);
    navigation.navigate('SampleTwo');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('SampleOne.title')}
          subtitle={translate('SampleOne.subtitle')}
        />
        <StepIndicator step={1} indicator={4} />
        <FormContainer>
          <HelperImageContainer>
            <StepSixHelperImage source={StepSix} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="SampleOne.sampleA"
            placeholder={translate('SampleOne.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant1"
            control={control}
            errorMessage={errors?.grainsPlant1?.message}
          />
          <TextInput
            label="SampleOne.sampleB"
            placeholder={translate('SampleOne.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant2"
            control={control}
            errorMessage={errors?.grainsPlant2?.message}
          />
          <TextInput
            label="SampleOne.sampleDescription"
            placeholder={translate(
              'SampleOne.sampleDescriptionPlaceholder'
            )}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSampleOne)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
