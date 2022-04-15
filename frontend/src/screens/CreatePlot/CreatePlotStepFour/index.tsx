import React from 'react';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepFourHelperImage
} from './styles';
import * as yup from 'yup';

import StepFour from '../../../assets/plot-steps-images/StepFour.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepFourScreenRouteProps } from '../../../data/routes/app';
import { TextInput } from '../../../components/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

const userLogin = yup.object().shape({
  lineDistance: yup.string().required('Distancia é obrigatória')
});

export const CreatePlotStepFour: React.FC<
  CreatePlotStepFourScreenRouteProps
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });

  const handleSubmitStepFour = (data: FieldValues) => {
    navigation.navigate('CreatePlotStepFive');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={'Quantidade de plantas'}
          subtitle={'Informe a quantidade de plantas em "2 metros" lineares'}
        />
        <StepIndicator step={1} indicator={3} />
        <FormContainer>
          <HelperImageContainer>
            <StepFourHelperImage source={StepFour} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="Distancia entre linhas"
            placeholder="Digite a distancia em cm"
            icon="check-square"
            secureTextEntry
            name="lineDistance"
            control={control}
            errorMessage={errors?.lineDistance?.message}
          />
          <NextStepButton>
            <Button
              title={'Continuar'}
              onPress={handleSubmit(handleSubmitStepFour)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
