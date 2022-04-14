import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { RFFontSize, RFWidth } from '../../utils/getResponsiveSizes';
import { TouchableOpacity } from 'react-native';

export const CardPropertContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: ${RFWidth(8)}px;
`;

export const CardPropertIcon = styled(Feather)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardPropertNameContainer = styled.View`
  flex-direction: column;
  margin: 0 ${RFWidth(12)}px;
`;

export const CardPropertName = styled.Text`
  font-size: ${RFFontSize(24)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardPropertDate = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardPropertButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  margin-left: ${RFWidth(8)}px;
  padding: ${RFWidth(4)}px;
`;
