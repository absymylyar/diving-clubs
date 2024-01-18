import { DivingGroupModel } from 'src/@models/diving-group-model';
import { Person } from 'src/@models/person';

export class AddDiverNotificationDto {
  DivingGroup: DivingGroupModel;
  Diver: Person;
}
