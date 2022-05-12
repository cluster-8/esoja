/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Marker, Polygon } from 'react-native-maps';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import Title from '../../../components/Title';
import { CreatePlotStepOneScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import {
  Container,
  FormContainer,
  MapContainer,
  MapViewMarker,
  NextStepButton,
  ReactNativeMapView
} from './styles';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const CreatePlotStepOne: React.FC<CreatePlotStepOneScreenRouteProps> = ({
  navigation
}) => {
  const region = {
    latitude: -23.25058,
    longitude: -45.891289,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  };
  const { saveLocale, getPersistedData } = useSample();
  const [polygon, setPolygon] = useState<Coordinates[]>([]);

  useEffect(() => {
    getPersistedData().then(data => {
      console.log(data);
    });
  }, [getPersistedData]);

  const handleSubmitStepOne = () => {
    if (polygon.length > 1) {
      setPolygon([...polygon, polygon[0]]);
    }
    saveLocale(polygon);
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
          <MapContainer>
            <ReactNativeMapView
              initialRegion={region}
              mapType="satellite"
              onPress={e => {
                setPolygon([...polygon, e.nativeEvent.coordinate]);
              }}
            >
              {polygon.length === 1 && (
                <MapViewMarker>
                  <Marker coordinate={polygon[0]} />
                </MapViewMarker>
              )}
              {polygon.length > 1 && (
                <MapViewMarker>
                  <Polygon
                    strokeColor="#FF1111"
                    fillColor="#FF555555"
                    coordinates={polygon}
                  />
                </MapViewMarker>
              )}
            </ReactNativeMapView>
          </MapContainer>
          {polygon.length >= 1 && (
            <>
              <NextStepButton>
                <Button title="Limpar" onPress={() => setPolygon([])} />
              </NextStepButton>
              <NextStepButton>
                <Button title="Continuar" onPress={handleSubmitStepOne} />
              </NextStepButton>
            </>
          )}
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
