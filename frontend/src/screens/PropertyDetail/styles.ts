import styled from 'styled-components/native';
import { RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

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
`;
