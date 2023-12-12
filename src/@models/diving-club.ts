import { Identifier } from './Identifier';
import { Address } from './address';

export interface DivingClub extends Identifier {
  name: string;
  address: Address;
  phoneNumber: string;
}
