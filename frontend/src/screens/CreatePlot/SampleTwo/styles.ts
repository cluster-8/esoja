import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../../utils/getResponsiveSizes';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${RFHeight(24)}px;
  background: ${({ theme }) => theme.colors.background_over};
`;

export const StepSevenHelperImage = styled.Image`
  width: 140px;
  height: 140px;
`;

export const HelperImageContainer = styled.View`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background_over};
  border-radius: 100px;
  margin: ${RFHeight(16)}px auto;
`;

export const FormContainer = styled.View`
  padding: ${RFHeight(24)}px ${RFWidth(24)}px;
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
