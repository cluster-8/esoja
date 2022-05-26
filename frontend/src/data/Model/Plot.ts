import { Coordinates } from './Coordinates';
import { Property } from './Property';
import { Sample } from './Sample';

export interface Plot {
  id: string;
  propertyId: string;
  property: Property;
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
