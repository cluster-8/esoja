import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

interface ContainerProps {
  error?: string;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  min-height: ${RFHeight(56)}px;
  padding-left: ${RFWidth(8)}px;
  background: ${({ theme }) => theme.colors.background_over};
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.attention : theme.colors.details};
  flex-direction: row;
  align-items: center;
`;

export const StyledPickerSelect = styled(Picker)`
  flex: 1;
  min-height: ${RFHeight(56)}px;
  font-size: ${RFWidth(16)}px;
`;

interface IconProps {
  error?: string;
  selectedValue: boolean;
}
export const Icon = styled(Feather)<IconProps>`
  margin-left: ${RFWidth(8)}px;
  margin-right: ${RFWidth(8)}px;
  color: ${({ theme, error, selectedValue }) => {
    if (error) {
      return theme.colors.attention;
    }
    if (selectedValue) {
      return theme.colors.primary;
    }
    return theme.colors.details;
  }};
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

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFFontSize(14)}px;
  margin: 0 ${RFHeight(4)}px;
`;
