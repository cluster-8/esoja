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
import { translate } from '../../../data/I18n';
import { PlotCoordinatesScreenRouteProps } from '../../../data/routes/app';
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

const plotCoordinates = yup.object().shape({
  areaTotal: yup.number().required('Quantidade é obrigatória').min(0.1)
});

//Passo 1
export const PlotCoordinates: React.FC<PlotCoordinatesScreenRouteProps> = ({
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
    resolver: yupResolver(plotCoordinates)
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
    return navigation.navigate('PlotIdentification');
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
          title={translate('PlotCoordinates.title')}
          subtitle={translate('PlotCoordinates.subtitle')}
        />
        <StepIndicator step={0} stepNumber={2} />
        <FormContainer>
          {mode === '' && (
            <QuestionStep>
              <QuestionTitle>
                {translate('PlotCoordinates.questionTitle')}
              </QuestionTitle>
              <SelectModeContainer>
                <ButtonCotainer onPress={() => setMode('POLYGON')}>
                  <ButtonTitle>
                    {translate('PlotCoordinates.drawFieldButton')}
                  </ButtonTitle>
                  <ButtonMessage>
                    {translate('PlotCoordinates.drawFieldButtonMsg')}
                  </ButtonMessage>
                </ButtonCotainer>
                <ButtonCotainer onPress={() => setMode('POINT')}>
                  <ButtonTitle>
                    {translate('PlotCoordinates.markPointButton')}
                  </ButtonTitle>
                  <ButtonMessage>
                    {translate('PlotCoordinates.markPointButtonMsg')}
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
                <ModeText>{translate('PlotCoordinates.modeText')}</ModeText>
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
                  label="PlotCoordinates.title"
                  placeholder={translate('PlotCoordinates.area')}
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
              title={translate('PlotCoordinates.ContinueButton')}
              onPress={handleSubmit(handleSubmitStepOne)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
