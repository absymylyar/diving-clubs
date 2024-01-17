import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from './person-dto';
import { MonitorModel } from 'src/@models/monitor';

export class MonitorDto extends PersonDto implements MonitorModel {
  @ApiProperty()
  monitorNumber?: number;
  @ApiProperty()
  rank: number;
}
