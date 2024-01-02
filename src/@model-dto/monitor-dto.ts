import { ApiProperty } from '@nestjs/swagger';
import { PersonDto } from './person-dto';
import { Monitor } from 'src/@models/monitor';

export class MonitorDto extends PersonDto implements Monitor {
  @ApiProperty()
  monitorNumber?: number;
  @ApiProperty()
  rank: number;
}
