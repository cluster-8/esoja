import React from 'react';
import { ScrollView } from 'react-native';
import StepFive from '../../../assets/plot-steps-images/StepFive.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import Title from '../../../components/Title';
import { translate } from '../../../data/I18n';
import { SampleExtractionScreenRouteProps } from '../../../data/routes/app';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepFiveHelperImage
} from './styles';

//Passo 5 ou 3B
export const SampleExtraction: React.FC<
  SampleExtractionScreenRouteProps
> = ({ navigation }) => {
  const handleSampleExtraction = () => {
    navigation.navigate('PicturePhotos');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('SampleExtraction.title')}
          subtitle={translate('SampleExtraction.subtitle')}
        />
        <StepIndicator step={1} indicator={2} />
        <FormContainer>
          <HelperImageContainer>
            <StepFiveHelperImage source={StepFive} resizeMode="contain" />
          </HelperImageContainer>
          <NextStepButton>
            <Button
              title={translate('SampleExtraction.continueButton')}
              onPress={handleSampleExtraction}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
