import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonEntity } from './PersonEntity';
import { Identifier } from 'src/@models/Identifier';

@Entity()
export class MonitorEntity implements Identifier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rank: number;
  @ManyToOne((type) => PersonEntity, (person) => person.monitor)
  person: PersonEntity;
}
