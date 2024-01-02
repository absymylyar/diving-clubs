import { DivingClub } from './diving-club';
import { Monitor } from './monitor';

export interface MonitorHistoric {
  monitor: Monitor;
  club: DivingClub;
  startDate: Date;
  endDate?: Date;
}
