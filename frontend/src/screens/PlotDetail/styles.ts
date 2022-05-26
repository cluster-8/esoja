import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const PlotDetailContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_over};
  padding-top: ${RFHeight(64)}px;
`;

export const PlotDetailHeaderContainer = styled.View`
  position: relative;
  width: 100%;
  height: ${RFHeight(200)}px;
  align-items: center;
  justify-content: center;
`;

export const PlotDetailTitleContainer = styled.View`
  margin: ${RFHeight(16)}px;
  overflow: hidden;
`;

export const PlotCropYear = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PlotArea = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PlotProduction = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PlotDetailCardTitle = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const PlotDetailImage = styled.Image`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PlotDetailPlotCardContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_over};
  padding: ${RFWidth(8)}px;
  align-items: center;
  justify-content: flex-start;
`;
