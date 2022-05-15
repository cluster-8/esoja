import { Cultive } from './Cultive';
import { User } from './User';

export interface Property {
  id: string;
  cultives?: Cultive[];
  user?: User;
  name?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  ibgeCode?: string;
  latitude?: number;
  longitude?: number;
}
