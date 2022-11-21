import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

export const WeatherInfoCardContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const WeatherInfoIcon = styled(Feather)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const WeatherInfoIconConatiner = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${RFHeight(8)}px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.white};
  border-radius: ${RFHeight(8)}px;
`;

export const WeatherInfoTitle = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const WeatherInfoValue = styled.Text`
  font-size: ${RFFontSize(16)}px;
  color: ${({ theme }) => theme.colors.white};
`;
