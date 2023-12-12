import { Identifier } from './Identifier';
import { Address } from './address';

export interface Person extends Identifier {
  firstName: string;
  lastName: string;
  address: Address;
  phoneNumber: string;
  birthDate: Date;
  bloodGroup: string;
}
