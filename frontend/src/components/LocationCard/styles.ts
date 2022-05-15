import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

export interface ContainerProps {
  onClick: () => void;
}

export const Container = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.background_over};
  margin-bottom: ${RFHeight(12)}px;
  border-radius: 5px;
  padding: 8px 24px;
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PropertyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(18)}px;
`;
