import { Plot } from './Plot';
import { User } from './User';

export interface Property {
  id: string;
  cultives?: Plot[];
  user?: User;
  name?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  ibgeCode?: string;
  latitude?: number;
  longitude?: number;
  picture?: string;
}
