import { fromUnixTime, isSameDay, subHours } from 'date-fns';

export const isToday = (date: number | Date) => {
  if (typeof date === 'number') {
    date = fromUnixTime(date);
  }
  return isSameDay(subHours(date, 3), new Date());
};
