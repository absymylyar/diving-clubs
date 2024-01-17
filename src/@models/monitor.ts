import { Identifier } from './Identifier';
import { Person } from './person';

export interface MonitorModel extends Person, Identifier {
  rank?: number;
  monitorNumber?: number;
}
