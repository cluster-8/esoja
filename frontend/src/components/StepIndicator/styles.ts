import styled from 'styled-components/native';
import { RFWidth } from '../../utils/getResponsiveSizes';

export const Container = styled.View`
  width: 100%;
  margin: ${RFWidth(24)}px;
`;

interface IndicatorProps {
  status: string;
  position: number;
  currentPosition: number;
}

export const Indicator = styled.Text<IndicatorProps>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme, status, position, currentPosition }) => {
    if (status === 'current') {
      return theme.colors.white;
    }
    if (position > currentPosition) {
      return theme.colors.text;
    }
    return theme.colors.primary;
  }};
`;
