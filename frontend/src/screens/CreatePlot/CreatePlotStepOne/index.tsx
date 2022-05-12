import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import Title from '../../../components/Title';
import { CreatePlotStepOneScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import { Container, FormContainer, NextStepButton } from './styles';

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
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{ width: '100%', height: '100%' }}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
          />
          <NextStepButton>
            <Button title="Continuar" onPress={handleSubmitStepOne} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
