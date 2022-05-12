import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RFFontSize, RFWidth } from '../../utils/getResponsiveSizes';

export const CardPropertContainer = styled.View`
  position: relative;
  flex-direction: row;
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const CardPropertPropertContainer = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const CardPropertIcon = styled(Feather)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;
export const CardPropertOptionIcon = styled(Feather)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardPropertNameContainer = styled.View`
  flex-direction: column;
  margin: 0 ${RFWidth(8)}px;
`;

export const CardPropertName = styled.Text`
  font-size: ${RFFontSize(18)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardPropertDate = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardPropertButton = styled(TouchableOpacity)`
  position: absolute;
  right: ${RFWidth(4)}px;
  align-items: center;
  justify-content: center;
  margin-left: ${RFWidth(8)}px;
  padding: ${RFWidth(4)}px;
`;
