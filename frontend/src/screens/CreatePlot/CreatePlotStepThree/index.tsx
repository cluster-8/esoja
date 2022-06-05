import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { translate } from '../../../data/I18n';
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
    .required('CreatePlotStepThree.errors.metersBetweenPlants.required')
    .min(1, 'CreatePlotStepThree.errors.metersBetweenPlants.min')
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
          title={translate('CreatePlotStepThree.title')}
          subtitle={translate('CreatePlotStepThree.subtitle')}
        />
        <StepIndicator step={0} indicator={1} />
        <FormContainer>
          <HelperImageContainer>
            <StepThreeHelperImage source={StepThree} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label='CreatePlotStepThree.distanceBetweenLines'
            placeholder={translate('CreatePlotStepThree.distanceBetweenLinesPlaceholder')}
            icon="check-square"
            keyboardType="numeric"
            name="metersBetweenPlants"
            control={control}
            errorMessage={errors?.metersBetweenPlants?.message}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepThree.continueButton')}
              onPress={handleSubmit(handleSubmitStepThree)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
