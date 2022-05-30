import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const SampleInformationContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFWidth(6)}px;
  margin: ${RFHeight(8)}px;
`;

export const SampleName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

export const SampleData = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
