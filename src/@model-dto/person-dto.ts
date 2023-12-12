import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '../@models/address-dto';
import { Person } from '../@models/person';

export class PersonDto implements Person {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  id?: number | undefined;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  bloodGroup: string;

  @ApiProperty()
  address: AddressDto;
}
