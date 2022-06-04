import { yupResolver } from '@hookform/resolvers/yup';
import { convertArea, getAreaOfPolygon } from 'geolib';
import React, { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import { Marker, Polygon } from 'react-native-maps';
import { useTheme } from 'styled-components';
import * as yup from 'yup';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { CreatePlotStepOneScreenRouteProps } from '../../../data/routes/app';
import { useLocation } from '../../../hooks/useLocation';
import { usePlot } from '../../../hooks/usePlot';
import {
  ButtonCotainer,
  ButtonMessage,
  ButtonTitle,
  Container,
  FormContainer,
  MapButton,
  MapContainer,
  MapIcon,
  MapViewMarker,
  ModeTag,
  ModeText,
  NextStepButton,
  QuestionStep,
  QuestionTitle,
  ReactNativeMapView,
  SelectModeContainer
} from './styles';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const initialRegion = {
  latitude: -23.25058,
  longitude: -45.891289,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005
};

const stepOne = yup.object().shape({
  areaTotal: yup.number().required('Quantidade é obrigatória').min(0.1)
});

export const CreatePlotStepOne: React.FC<CreatePlotStepOneScreenRouteProps> = ({
  navigation
}) => {
  const [mode, setMode] = useState('');
  const [polygon, setPolygon] = useState<Coordinates[]>([]);
  const [region, setRegion] = useState(initialRegion);

  const theme = useTheme();
  const { getCoordinates } = useLocation();
  const { localeStep } = usePlot();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(stepOne)
  });

  const getCurrentCoordinates = useCallback(async () => {
    const coords = await getCoordinates();
    if (coords?.latitude) {
      setRegion({ ...coords, latitudeDelta: 0.005, longitudeDelta: 0.005 });
    }
  }, [getCoordinates]);

  const handleSubmitStepOne = (data: FieldValues) => {
    if (!polygon.length) {
      return Alert.alert('Localização invalida', 'Marque o talhão no mapa ');
    }
    if (mode === 'POLYGON' && polygon.length < 3) {
      return Alert.alert(
        'Talhão invalido',
        'Marque no minimo 3 pontos ou escolha o modo ponto unico'
      );
    }
    localeStep(polygon, data.areaTotal);
    return navigation.navigate('CreatePlotStepTwo');
  };

  const getArea = (pol: Coordinates[]) => {
    const area = getAreaOfPolygon(pol);
    if (area) {
      setValue('areaTotal', convertArea(area, 'ha').toFixed(2));
    }
  };

  useEffect(() => {
    getCurrentCoordinates();
  }, [getCurrentCoordinates]);

  return (
    <ScrollView>
      <Container>
        <Title
          title="Coordenadas do talhão"
          subtitle="Marque no mapa a localização e area correspondente ao talhão"
        />
        <StepIndicator step={0} />
        <FormContainer>
          {mode === '' && (
            <QuestionStep>
              <QuestionTitle>Como deseja prosseguir</QuestionTitle>
              <SelectModeContainer>
                <ButtonCotainer onPress={() => setMode('POLYGON')}>
                  <ButtonTitle>Desenhar talhão no mapa</ButtonTitle>
                  <ButtonMessage>
                    marque todos os pontos do talhão e calcularemos a area
                    automaticamente
                  </ButtonMessage>
                </ButtonCotainer>
                <ButtonCotainer onPress={() => setMode('POINT')}>
                  <ButtonTitle>Marcar ponto unico</ButtonTitle>
                  <ButtonMessage>
                    marque o ponto central do tralhao e informe a area
                    manualmente
                  </ButtonMessage>
                </ButtonCotainer>
              </SelectModeContainer>
            </QuestionStep>
          )}
          {!!mode && (
            <>
              <ModeTag
                onPress={() => {
                  setMode('');
                  setPolygon([]);
                  setValue('areaTotal', '');
                }}
              >
                <ModeText>Alterar modo</ModeText>
              </ModeTag>
              <MapContainer>
                <ReactNativeMapView
                  initialRegion={initialRegion}
                  showsUserLocation
                  mapType="satellite"
                  region={region}
                  onPress={e => {
                    if (mode === 'POINT') {
                      setPolygon([e.nativeEvent.coordinate]);
                    } else {
                      setPolygon([...polygon, e.nativeEvent.coordinate]);
                      getArea([...polygon, e.nativeEvent.coordinate]);
                    }
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
                <MapButton top={0} onPress={getCurrentCoordinates}>
                  <MapIcon name="crosshair" size={25} />
                </MapButton>
                {!!polygon?.length && (
                  <MapButton top={60} danger onPress={() => setPolygon([])}>
                    <MapIcon
                      name="x-circle"
                      size={25}
                      color={theme.colors.attention}
                    />
                  </MapButton>
                )}
                <TextInput
                  label="Area"
                  placeholder="Area do talhão em ha"
                  icon="check-square"
                  disabled={mode === 'POLYGON'}
                  name="areaTotal"
                  control={control}
                  errorMessage={errors?.areaTotal?.message}
                />
              </MapContainer>
            </>
          )}
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSubmitStepOne)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
