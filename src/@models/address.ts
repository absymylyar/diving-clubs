import { Identifier } from './Identifier';

export interface Address extends Identifier {
  streetNumber: string;
  street: string;
  zipCode: string;
  city: string;
}
