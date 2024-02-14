/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MonitorEntity } from './MonitorEntity';
import { DivingClubEntity } from './DivingClubEntity';
import { Identifier } from 'src/@models/Identifier';
import { PersonEntity } from './PersonEntity';
import { LicenceEntity } from './LicenceEntity';

@Entity()
export class DivingGroupEntity implements Identifier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'int' })
  minimumRank: number;

  @ManyToOne((type) => MonitorEntity, (dg) => dg.divingGroups)
  monitor: MonitorEntity;
  @ManyToOne((type) => DivingClubEntity, (dc) => dc.divingGroups)
  club: DivingClubEntity;
  @ManyToMany((type) => LicenceEntity, (dg) => dg.dives)
  divers: Promise<LicenceEntity[]>;
}
