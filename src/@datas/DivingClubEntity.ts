import { DivingClub } from '../@models/diving-club';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AddressEntity } from './AddressEntity';
import { LicenceEntity } from './LicenceEntity';
import { DivingGroupEntity } from './DivingGroupEntity';

@Entity()
export class DivingClubEntity implements DivingClub {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phoneNumber: string;
  @ManyToOne((type) => AddressEntity, (address) => address.clubs)
  address: AddressEntity;

  licences: LicenceEntity[];
  divingGroups: DivingGroupEntity[];
}
