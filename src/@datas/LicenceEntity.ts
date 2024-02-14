/* eslint-disable @typescript-eslint/no-unused-vars */
import { Identifier } from 'src/@models/Identifier';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './PersonEntity';
import { DivingClubEntity } from './DivingClubEntity';
import { LicenceModel } from 'src/@models/licence-model';
import { DivingGroupEntity } from './DivingGroupEntity';

@Entity()
export class LicenceEntity implements LicenceModel, Identifier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rank: number;
  @Column()
  dateStart: Date;
  @Column({ nullable: true })
  dateEnd?: Date;

  @ManyToOne((type) => PersonEntity, (person) => person.licences)
  person: PersonEntity;
  @ManyToOne((type) => DivingClubEntity, (club) => club.licences)
  club: DivingClubEntity;
  @ManyToMany((type) => DivingGroupEntity, (dg) => dg.divers)
  @JoinTable()
  dives: Promise<DivingGroupEntity[]>;
}
