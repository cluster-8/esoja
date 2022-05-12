import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const Container = styled.View`
  width: 100%;
  min-height: ${RFHeight(56)}px;
  padding-left: ${RFWidth(8)}px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.details};
  flex-direction: row;
  align-items: center;
`;

export const StyledPickerSelect = styled(Picker)`
  flex: 1;
  min-height: ${RFHeight(56)}px;
  font-size: ${RFWidth(16)}px;
`;

export const Icon = styled(Feather)`
  margin-left: ${RFWidth(8)}px;
  margin-right: ${RFWidth(8)}px;
`;

export const ErrorContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: ${RFHeight(8)}px;
`;

export const ErrorLabel = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFWidth(11)}px;
`;

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(14)}px;
  margin-top: ${RFHeight(12)}px;
  margin-bottom: ${RFHeight(8)}px;
`;
