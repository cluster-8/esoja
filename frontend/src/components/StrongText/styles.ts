import styled from 'styled-components/native';
import { RFFontSize } from '../../utils/getResponsiveSizes';

export const StrongTextStyled = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFFontSize(16)}px;
  font-weight: bold;
`;
