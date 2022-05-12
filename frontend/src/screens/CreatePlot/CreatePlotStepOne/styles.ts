import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../../utils/getResponsiveSizes';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${RFHeight(24)}px;
  background: ${({ theme }) => theme.colors.background_over};
`;

export const StepTwoHelperImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const HelperImageContainer = styled.View`
  width: 160px;
  height: 160px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background_over};
  border-radius: 80px;
  margin: ${RFHeight(16)}px auto;
`;

export const FormContainer = styled.View`
  padding: ${RFHeight(8)}px ${RFWidth(24)}px;
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: 100%;
  justify-content: center;
  border-top-left-radius: ${RFHeight(32)}px;
  border-top-right-radius: ${RFHeight(32)}px;
`;

export const MapContainer = styled.View`
  flex: 1;
  height: ${RFHeight(400)}px;
  margin-top: 10px;
`;

export const ReactNativeMapView = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MapViewMarker = styled.View``;

export const NextStepButton = styled.View`
  margin: ${RFHeight(24)}px 0;
`;
