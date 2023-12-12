import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AddressEntity } from './AddressEntity';
import { Person } from '../@models/person';

@Entity()
export class PersonEntity implements Person {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  phoneNumber: string;
  @Column()
  birthDate: Date;
  @Column()
  bloodGroup: string;

  @ManyToOne((type) => AddressEntity, (address) => address.persons)
  address: AddressEntity;
}
