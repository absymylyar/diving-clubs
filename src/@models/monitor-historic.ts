import { DivingClub } from './diving-club';
import { MonitorModel } from './monitor';

export interface MonitorHistoric {
  monitor: MonitorModel;
  club: DivingClub;
  startDate: Date;
  endDate?: Date;
}
