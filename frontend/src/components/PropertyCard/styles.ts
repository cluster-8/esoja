import styled from 'styled-components/native';
import { RFWidth } from '../../utils/getResponsiveSizes';

export const PropertyInformationContainer = styled.View`
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

export const PropertyName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

export const PropertyCity = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
