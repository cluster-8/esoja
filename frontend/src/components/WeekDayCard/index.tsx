import React from "react";
import { WeekDayCardContainer, WeekDayItem } from "./style";
import { formatWeekDay } from "../../utils/formatter";
import { isToday } from "../../utils/isToday";
import { fromUnixTime, isSameDay } from "date-fns";

interface WeekDayCardProps {
  selectedDate: number | Date;
  date: number | Date;
  onPress: () => void;
}

export const WeekDayCard: React.FC<WeekDayCardProps> = ({
  selectedDate,
  date,
  onPress,
}) => {
  return (
    <WeekDayCardContainer onPress={onPress}>
      <WeekDayItem
        selectedDate={isSameDay(
          fromUnixTime(date as number),
          fromUnixTime(selectedDate as number)
        )}
      >
        {isToday(date) ? "HOJE" : formatWeekDay(date).toUpperCase()}
      </WeekDayItem>
    </WeekDayCardContainer>
  );
};
