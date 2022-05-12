import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

interface WeatherContainerProps {
  weatherType: string;
}

const handleContainerColorType = (weatherType: string) => {
  switch (weatherType) {
    case 'Thunderstorm':
      return '#2d2994';
    case 'Drizzle':
      return '#d0d2d1';
    case 'Rain':
      return '#92bad2';
    case 'Snow':
      return '#b0d6f2';
    case 'Clear':
      return '#03d7fc';
    case 'Clouds':
      return '#949494';
    default:
      return '#379634';
  }
};

export const WeatherContainer = styled.View<WeatherContainerProps>`
  flex: 1;
  align-items: center;
  background-color: ${({ weatherType }) =>
    handleContainerColorType(weatherType)};
  padding: 8px;
  padding-top: 120px;
  padding-bottom: 60px;
`;

export const WeekDayCardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${RFHeight(16)}px 0;
`;

export const WeatherMainContainer = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  margin: ${RFHeight(16)}px 0;
`;

export const WeatherImage = styled.Image`
  width: 160px;
  height: 160px;
  margin-right: ${RFWidth(120)}px;
`;

export const WeatherTemp = styled.Text`
  font-size: ${RFFontSize(80)}px;
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: ${RFWidth(48)}px;
  top: ${RFHeight(88)}px;
`;

export const WeatherStatus = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFHeight(24)}px;
`;

export const WeatherMaxAndMin = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const WeatherDetailsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: ${RFHeight(16)}px;
`;

export const WeatherDayPeriodContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: ${RFHeight(16)}px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: ${RFHeight(8)}px;
`;

export const WeatherDayContent = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: ${RFHeight(4)}px 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: ${RFHeight(8)}px;
`;

export const WeatherSunsetIcon = styled(Feather)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.yellow};
  margin-right: ${RFWidth(8)}px;
  margin-bottom: ${RFHeight(4)}px;
`;

export const WeatherSunsetIconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const WeatherPeriodCard = styled.View`
  justify-content: space-evenly;
  align-items: center;
`;

export const WeatherPeriodTitle = styled.Text`
  font-size: ${RFFontSize(18)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const WeatherPeriodTemp = styled.Text`
  font-size: ${RFFontSize(24)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;
