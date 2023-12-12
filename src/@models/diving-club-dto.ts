import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address-dto';
import { DivingClub } from './diving-club';

export class DivingClubDto implements DivingClub {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: AddressDto;
  @ApiProperty()
  id?: number | undefined;
  @ApiProperty()
  phoneNumber: string;
}
