import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const Container = styled.View`
  margin: ${RFHeight(24)}px ${RFWidth(8)}px;
  background: ${({ theme }) => theme.colors.primary};
  padding: ${RFHeight(8)}px;
  border-radius: ${RFWidth(6)}px;
  width: ${RFWidth(100)}px;
`;

export const StatisticsCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFWidth(16)}px;
  font-weight: bold;
`;

export const StatisticsCardValue = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: ${RFWidth(14)}px;
  font-weight: bold;
  margin-top: ${RFHeight(8)}px;
`;
