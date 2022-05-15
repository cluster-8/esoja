import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
// import { DataListProps } from '.';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const ChartContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  margin-top: ${RFWidth(24)}px;
  margin-bottom: ${RFWidth(24)}px;
`;

export const TextStyled = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
`;
