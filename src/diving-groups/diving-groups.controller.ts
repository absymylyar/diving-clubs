import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { DivingGroupsService } from './diving-groups.service';

@Controller('diving-group')
export class DivingGroupController {
  constructor(private readonly service: DivingGroupsService) {}
  @Get('/:id')
  async getDivingGroupClub(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const result = await this.service.getDivingGroup(id);
    if (!result) {
      throw new NotFoundException('Diving club does not exist!');
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
@Controller('diving-groups')
export class DivingGroupsController {
  constructor(private readonly service: DivingGroupsService) {}
}
