import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${RFHeight(24)}px;
  background: ${({ theme }) => theme.colors.background_over};
`;

export const FormContainer = styled.View`
  padding: ${RFHeight(8)}px ${RFWidth(24)}px;
  flex: 1;
  width: 100%;
  justify-content: center;
`;

export const StatisticsMenuContainer = styled.View`
  position: relative;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${RFHeight(24)}px;
  border-top-right-radius: ${RFHeight(24)}px;
`;

export const StatisticsCardWidgetContainer = styled.View`
  flex-direction: row;
  position: absolute;
  top: -${RFHeight(40)}px;
  justify-content: space-evenly;
`;

export const StatisticsContentContainer = styled.View`
  flex: 1;
  width: 100%;
  margin: ${RFHeight(60)}px 0;
  padding: 0 ${RFHeight(16)}px;
`;

export const StatisticsCardContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${RFHeight(40)}px;
`;
