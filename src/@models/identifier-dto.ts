import { ApiProperty } from '@nestjs/swagger';
import { Identifier } from './Identifier';

export class IdentifierDto implements Identifier {
  @ApiProperty()
  id?: number;
}
