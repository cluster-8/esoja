import { fromUnixTime, isSameDay, subHours } from 'date-fns';

export const isToday = (date: number | Date) => {
  if (typeof date === 'number') {
    const formatDate = fromUnixTime(date);
    return isSameDay(subHours(formatDate, 3), new Date());
  }
  return false;
};
