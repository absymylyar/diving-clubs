import { ApiProperty } from '@nestjs/swagger';

export class DivingGroupDto {
  @ApiProperty()
  monitorId: number;
  @ApiProperty()
  clubId: number;
  @ApiProperty()
  minimumRank: number;
  @ApiProperty()
  date: Date;
}
