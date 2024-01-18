import { ApiProperty } from '@nestjs/swagger';

export class AddDiverToDivingGroupDto {
  @ApiProperty()
  divingGroupId: number;
  @ApiProperty()
  diverId: number;
}
