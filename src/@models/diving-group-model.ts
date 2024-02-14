import { Identifier } from 'src/@models/Identifier';
import { MonitorModel } from './monitor';
import { DivingClub } from './diving-club';
import { LicenceModel } from './licence-model';

export interface DivingGroupModel extends Identifier {
  monitor: MonitorModel;
  club: DivingClub;
  date: Date;
  minimumRank: number;
  divers: Promise<LicenceModel[]>;
}
