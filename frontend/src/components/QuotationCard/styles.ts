import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

interface ContainerProps {
  color: string;
}
export const Container = styled.View<ContainerProps>`
  background-color: ${({ color, theme }) =>
    color === 'red' ? theme.colors.attention : theme.colors.success};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${RFHeight(4)}px 0;
  padding: ${RFHeight(4)}px ${RFHeight(8)}px;
  border-radius: ${RFHeight(6)}px;
`;

export const QuotationDate = styled.Text`
  font-size: ${RFFontSize(18)}px;
`;
export const QuotationPrice = styled.Text`
  font-size: ${RFFontSize(18)}px;
`;
export const QuotationVariation = styled.Text`
  font-size: ${RFFontSize(18)}px;
`;
