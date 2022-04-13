import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

export const PictureStyled = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const Placeholder = styled.TouchableOpacity`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.details};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const PlaceholderIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.details};
`;

export const PlaceholderText = styled.Text`
  font-size: ${RFFontSize(14)}px;
  text-align: center;
  margin: ${RFHeight(8)}px;
  color: ${({ theme }) => theme.colors.details};
`;

export const UpdateImageButton = styled.TouchableOpacity`
  margin-top: ${RFHeight(8)}px;
`;

export const UpdateImageText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;