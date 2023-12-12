import { Address } from '../@models/address';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DivingClubEntity } from './DivingClubEntity';

@Entity()
export class AddressEntity implements Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  streetNumber: string;
  @Column()
  street: string;
  @Column()
  zipCode: string;
  @Column()
  city: string;

  clubs: DivingClubEntity[];
}
