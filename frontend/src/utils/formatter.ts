/* eslint-disable no-param-reassign */
/* eslint-disable import/no-duplicates */
import { format, fromUnixTime, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatWeekDay = (date: number | Date) => {
  if (typeof date === 'number') {
    date = fromUnixTime(date);
  }
  return format(subHours(date, 3), 'eeeeee', {
    locale: ptBR
  });
};

export const formatHour = (date: number | Date) => {
  if (typeof date === 'number') {
    date = fromUnixTime(date);
  }
  return format(subHours(date, 3), 'kk:mm', {
    locale: ptBR
  });
};
