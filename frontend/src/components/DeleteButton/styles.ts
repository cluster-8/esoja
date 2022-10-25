import styled, { css } from 'styled-components/native';
import { RectButton as RectButtonRNGH } from 'react-native-gesture-handler';

import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

interface TypeProps {
  type: 'primary' | 'secondary' | 'tertiary';
}

export const RectButton = styled(RectButtonRNGH)`
  height: ${RFHeight(35)}px;
  border-radius: ${RFHeight(8)}px;
  background: #D03737;
  margin:5px;
  justify-content: center;
  align-items: center;
`;

export const TouchableOpacity = styled.TouchableOpacity<TypeProps>`
  height: ${RFHeight(56)}px;
  border-radius: ${RFHeight(8)}px;

  justify-content: center;
  align-items: center;

  ${props =>
    props.type === 'secondary' &&
    css`
      border-width: ${RFWidth(2)}px;
      border-color: ${({ theme }) => theme.colors.primary};
    `}
`;

export const ButtonText = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(18)}px;

  ${props =>
    props.type === 'primary' &&
    css`
      color: #ffffff;
    `}

  ${props =>
    (props.type === 'secondary' || props.type === 'tertiary') &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
`;
