import { Coordinates } from './Coordinates';
import { Sample } from './Sample';

export interface Plot {
  propertyId: string;
  cultiveCoordinates: Coordinates[];
  samples: Sample[];
  cropYear: string;
  plantingDate: string;
  areaTotal: number;
  plantsPerMeter: number;
  metersBetweenPlants: number;
  status: 'pending';
  description?: string;
  photo?: string;
}
