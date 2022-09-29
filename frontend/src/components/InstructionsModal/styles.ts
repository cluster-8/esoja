import styled from 'styled-components/native';
import { RFHeight } from '../../utils/getResponsiveSizes';

export const FullView = styled.View`
  flex: 1;
  align-items: center;
  margin-top:0px;
  background-color: ${({ theme }) => theme.colors.background};
    border-top-left-radius: ${RFHeight(32)}px;
  border-top-right-radius: ${RFHeight(32)}px;

`;

export const ModalStyled = styled.Modal`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ModalView = styled.View`
  padding: ${RFHeight(16)}px;
`;

export const Button = styled.Pressable`
  border-radius: ${RFHeight(20)}px;
  padding: ${RFHeight(10)}px;
`;

export const TitleStyled = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TextStyled = styled.Text`
  color: white;
  text-align: center;
`;

export const ModalText = styled.Text`
  margin-bottom: ${RFHeight(15)}px;
  text-align: center;
`;

const instructionsImageSize = RFHeight(50)

export const InstructionsImage = styled.Image.attrs(({ theme }) => ({
  source: theme.images.soja
}))`
  width: ${instructionsImageSize}px;
  height: ${instructionsImageSize}px;
`;
