import { Plot } from './Plot';

export interface Sample {
  id: string;
  cultive: Plot;
  name: string;
  description: string;
  grainsPlant1: number;
  grainsPlant2: number;
}
