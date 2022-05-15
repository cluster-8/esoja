/* eslint-disable @typescript-eslint/no-explicit-any */
interface Populate {
  path: string;
  select: string;
  populate?: Populate;
}

export interface Query {
  select: string;
  page?: number;
  limit?: number;
  sort?: string | object;
  populate?: Populate[];
  and?: any[];
  or?: any[];
  [key: string]: any;
}
