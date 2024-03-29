import { ApiProperty } from '@nestjs/swagger';

export class LicenceDto {
  @ApiProperty()
  personId: number;
  @ApiProperty()
  clubId: number;
  @ApiProperty()
  rank: number;
  @ApiProperty()
  startDate: Date;
}
