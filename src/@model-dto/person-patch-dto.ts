import { ApiProperty } from '@nestjs/swagger';
import { AddressPatchDto } from './address-patch-dto';
import { IdentifierDto } from '../@models/identifier-dto';

export class PersonPatchDto extends IdentifierDto {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  phoneNumber?: string;
  @ApiProperty()
  birthDate?: Date;
  @ApiProperty()
  bloodGroup?: string;

  @ApiProperty()
  address?: AddressPatchDto;
}
