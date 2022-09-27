import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

const logoImageSize = RFWidth(160);

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BrandText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(24)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: ${RFHeight(24)}px;
`;

export const LogoImage = styled.Image.attrs(({ theme }) => ({
  source: theme.images.esoja_logo
}))`
  width: ${logoImageSize}px;
  height: ${logoImageSize}px;
`;
