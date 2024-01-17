/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AddressEntity } from './AddressEntity';
import { Person } from '../@models/person';
import { MonitorEntity } from './MonitorEntity';
import { DivingGroupEntity } from './DivingGroupEntity';

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

  monitor?: MonitorEntity;
  @ManyToMany((type) => DivingGroupEntity, (dg) => dg.divers)
  @JoinTable()
  dives: Promise<DivingGroupEntity[]>;
}
