import { Feather } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import {
  RFFontSize,
  RFHeight,
  RFWidth
} from '../../../utils/getResponsiveSizes';

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
  position: relative;
  flex: 1;
  height: ${RFHeight(380)}px;
  margin-top: 10px;
`;

export const QuestionStep = styled.View`
  flex: 1;
  height: ${RFHeight(400)}px;
  margin-top: 10px;
`;

export const SelectModeContainer = styled.View`
  flex: 1;
  height: ${RFHeight(400)}px;
  margin-top: 16px;
`;
export const ButtonCotainer = styled.TouchableOpacity`
  flex: 1;
  padding: ${RFHeight(16)}px;
  background: ${({ theme }) => theme.colors.background_over};
  border-radius: ${RFHeight(8)}px;
  margin: ${RFHeight(8)}px 0;
`;

export const QuestionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(24)}px;
  margin: ${RFHeight(8)}px 0;
  text-align: center;
  font-weight: bold;
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFFontSize(18)}px;
  margin: ${RFHeight(8)}px 0;
  text-align: center;
  font-weight: bold;
`;

export const ButtonMessage = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: ${RFFontSize(18)}px;
  text-align: center;
  font-weight: normal;
`;

export const ModeTag = styled.TouchableOpacity`
  padding: ${RFHeight(4)}px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${RFHeight(16)}px;
  margin: ${RFHeight(8)}px 0;
`;

export const ModeText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFFontSize(18)}px;
  text-align: center;
  font-weight: bold;
`;

interface MapButtonProps {
  top: number;
  danger?: boolean;
}
export const MapButton = styled.TouchableOpacity<MapButtonProps>`
  position: absolute;
  background: ${({ theme, danger }) =>
    danger ? theme.colors.attention : theme.colors.primary};
  margin: ${RFHeight(8)}px 0;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  right: 8px;
  top: ${({ top }) => top}px;
  align-items: center;
  justify-content: center;
`;

export const MapIcon = styled(Feather)`
  padding: ${RFHeight(4)}px;
  border-radius: ${RFHeight(16)}px;
  margin: ${RFHeight(8)}px 0;
  color: ${({ theme }) => theme.colors.white};
`;

export const ReactNativeMapView = styled(MapView)`
  flex: 1;
`;

export const MapViewMarker = styled.View``;

export const NextStepButton = styled.View`
  margin: ${RFHeight(16)}px 0;
`;
