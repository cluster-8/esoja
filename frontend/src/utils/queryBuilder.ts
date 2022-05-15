import QueryString from 'qs';
import { Query } from '../data/Model/Query';

export const queryBuilder = (query: Query) => {
  return `?${QueryString.stringify(query)}`;
};
