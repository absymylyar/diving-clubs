import { ApiProperty } from '@nestjs/swagger';
import { IdentifierDto } from '../@models/identifier-dto';

export class AddressPatchDto extends IdentifierDto {
  @ApiProperty()
  streetNumber?: string;
  @ApiProperty()
  street?: string;
  @ApiProperty()
  zipCode?: string;
  @ApiProperty()
  city?: string;
}
