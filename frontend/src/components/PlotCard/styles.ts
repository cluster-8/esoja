import styled from 'styled-components/native';
import { RFWidth } from '../../utils/getResponsiveSizes';

export const PlotInformationContainer = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFWidth(6)}px;
`;

export const InformationContainer = styled.View`
  flex: 1;
  padding-left: ${RFWidth(16)}px;
`;

export const PlotName = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export const PlotCropYear = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const PlotArea = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const PlotProduction = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
