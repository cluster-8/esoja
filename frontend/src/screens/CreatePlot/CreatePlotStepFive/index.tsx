import React from 'react';
import { Container, FormContainer, HelperImageContainer, NextStepButton, StepFiveHelperImage } from './styles';

import StepFive from '../../../assets/plot-steps-images/StepFive.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepFiveScreenRouteProps } from '../../../data/routes/app';
import { Button } from '../../../components/Button';
import { ScrollView } from 'react-native';

export const CreatePlotStepFive: React.FC<CreatePlotStepFiveScreenRouteProps> = ({ navigation }) => {
  const handleSubmitStepFive = () => {
    navigation.navigate('CreatePlotStepSix');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={'Extração das amostras'}
          subtitle={'Nos proximos passos, vamos precisar de amostras do plantio, continue quando estiver proximo do talhão'}
        />
        <StepIndicator step={1} indicator={4} />
        <FormContainer>
          <HelperImageContainer>
            <StepFiveHelperImage source={StepFive} resizeMode="contain" />
          </HelperImageContainer>
          <NextStepButton>
            <Button title={'Continuar'} onPress={handleSubmitStepFive} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
