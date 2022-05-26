import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const PropertyDetailContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_over};
`;

export const PropertyDetailHeaderContainer = styled.View`
  position: relative;
  width: 100%;
  height: ${RFHeight(200)}px;
  align-items: center;
  justify-content: center;
`;

export const PropertyDetailTitleContainer = styled.View`
  height: 100px;
  align-items: center;
  justify-content: center;
  margin: ${RFHeight(16)}px;
`;

export const PropertyDetailCity = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PropertyDetailCardTitle = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const PropertyDetailImage = styled.Image`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PropertyDetailPlotCardContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_over};
  padding: ${RFWidth(8)}px;
  align-items: center;
  justify-content: flex-start;
`;
