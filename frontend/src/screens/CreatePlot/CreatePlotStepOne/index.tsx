import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { translate } from '../../../data/I18n';
import { Container, FormContainer, NextStepButton } from './styles';

import Title from '../../../components/Title';
import { StepIndicator } from '../../../components/StepIndicator';
import { CreatePlotStepOneScreenRouteProps } from '../../../data/routes/app';
import { Button } from '../../../components/Button';
import { useSample } from '../../../hooks/useSample';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const CreatePlotStepOne: React.FC<CreatePlotStepOneScreenRouteProps> = ({
  navigation
}) => {
  const { saveLocale, getPersistedData } = useSample();
  const [poligon, setPoligon] = useState<Coordinates[]>([]);

  useEffect(() => {
    getPersistedData().then(data => {
      console.log(data);
    });
  }, [getPersistedData]);

  const handleSubmitStepOne = () => {
    saveLocale(poligon);
    navigation.navigate('CreatePlotStepTwo');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title="Coordenadas do talhão"
          subtitle="Desenhe no mapa a area correspondente ao talhão"
        />
        <StepIndicator step={0} />
        <FormContainer>
          <NextStepButton>
            <Button title="Continuar" onPress={handleSubmitStepOne} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
