import { Cultive } from './Cultive';

export interface Sample {
  id: string;
  cultive: Cultive;
  name: string;
  description: string;
  grainsPlant1: number;
  grainsPlant2: number;
}
