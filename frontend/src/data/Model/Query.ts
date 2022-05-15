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
}
