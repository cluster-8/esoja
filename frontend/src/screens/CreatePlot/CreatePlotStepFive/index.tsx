import React from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepFiveHelperImage
} from './styles';

import StepFive from '../../../assets/plot-steps-images/StepFive.png';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepFiveScreenRouteProps } from '../../../data/routes/app';
import { Button } from '../../../components/Button';
import { translate } from '../../../data/I18n';

export const CreatePlotStepFive: React.FC<
  CreatePlotStepFiveScreenRouteProps
> = ({ navigation }) => {
  const handleSubmitStepFive = () => {
    navigation.navigate('CreatePlotStepSix');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('CreatePlotStepFive.title')}
          subtitle={translate('CreatePlotStepFive.subtitle')}
        />
        <StepIndicator step={1} indicator={4} />
        <FormContainer>
          <HelperImageContainer>
            <StepFiveHelperImage source={StepFive} resizeMode="contain" />
          </HelperImageContainer>
          <NextStepButton>
            <Button title={translate('CreatePlotStepFive.continueButton')} onPress={handleSubmitStepFive} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
