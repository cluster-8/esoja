import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${RFHeight(16)}px;
  background: ${({ theme }) => theme.colors.background_over};
`;

export const FormContainer = styled.View`
  margin-top: ${RFHeight(24)}px;
  padding: ${RFHeight(8)}px ${RFWidth(24)}px;
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: 100%;
  justify-content: center;
  border-top-left-radius: ${RFHeight(32)}px;
  border-top-right-radius: ${RFHeight(32)}px;
`;

export const NextStepButton = styled.View`
  margin: ${RFHeight(24)}px 0;
`;
