import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export interface ContainerProps {
  onClick: () => void;
}

export const Container = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${RFHeight(12)}px;
  border-radius: ${RFHeight(6)}px;
  padding: ${RFHeight(8)}px ${RFWidth(16)}px;
  flex: 1;
  overflow: hidden;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PropertyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFFontSize(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;
