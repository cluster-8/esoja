import React from "react";
import {
  WeatherInfoCardContainer,
  WeatherInfoIcon,
  WeatherInfoIconConatiner,
  WeatherInfoTitle,
  WeatherInfoValue,
} from "./style";
import { RFFontSize } from "../../utils/getResponsiveSizes";

interface WeekDayCardProps {
  title: string;
  value: string;
  icon: string;
}

export const WeatherInfoCard: React.FC<WeekDayCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <WeatherInfoCardContainer>
      <WeatherInfoIconConatiner>
        <WeatherInfoIcon name={icon} size={RFFontSize(40)} />
      </WeatherInfoIconConatiner>
      <WeatherInfoTitle>{title}</WeatherInfoTitle>
      <WeatherInfoValue>{value}</WeatherInfoValue>
    </WeatherInfoCardContainer>
  );
};
