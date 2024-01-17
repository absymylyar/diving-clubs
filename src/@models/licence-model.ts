import { Identifier } from './Identifier';
import { DivingClub } from './diving-club';
import { Person } from './person';

export interface LicenceModel extends Identifier {
  person: Person;
  club: DivingClub;
  rank: number;
  dateStart: Date;
  dateEnd: Date;
}
