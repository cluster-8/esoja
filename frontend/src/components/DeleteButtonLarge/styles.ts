import styled, { css } from 'styled-components/native';
import { RectButton as RectButtonRNGH } from 'react-native-gesture-handler';

import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

interface TypeProps {
  type: 'primary' | 'secondary' | 'tertiary';
}

export const RectButton = styled(RectButtonRNGH)`
  height: ${RFHeight(45)}px;
  width:100%;
  border-radius: ${RFHeight(8)}px;
  background: #D03737;
  margin-top:20%;
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


