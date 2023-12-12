import { ApiProperty } from '@nestjs/swagger';
import { AddressPatchDto } from './address-patch-dto';
import { IdentifierDto } from '../@models/identifier-dto';

export class DivingClubPatchDto extends IdentifierDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  address?: AddressPatchDto;
}
