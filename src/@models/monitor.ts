import { Identifier } from './Identifier';
import { Person } from './person';

export interface Monitor extends Person, Identifier {
  rank?: number;
  monitorNumber?: number;
}
