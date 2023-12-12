import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address';
import { IdentifierDto } from './identifier-dto';
import { Identifier } from './Identifier';

export class AddressDto extends IdentifierDto implements Address, Identifier {
  @ApiProperty()
  streetNumber: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  city: string;
}
