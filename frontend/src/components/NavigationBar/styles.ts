import styled from 'styled-components/native';
import { RFFontSize } from '../../utils/getResponsiveSizes';

interface NavigationProps {
  selected: boolean;
}

export const NavigationBarContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  height: ${RFFontSize(56)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const NavigationBarButton = styled.TouchableOpacity<NavigationProps>`
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.background_over : theme.colors.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.background_over};
`;

export const NavigationBarText = styled.Text<NavigationProps>`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.primary};
`;
