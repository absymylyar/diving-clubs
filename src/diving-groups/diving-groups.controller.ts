import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { DivingGroupsService } from './diving-groups.service';
import { DivingGroupDto } from 'src/@model-dto/diving-group-dto';
import { AddDiverToDivingGroupDto } from 'src/@model-dto/add-diver-to-diving-group-dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('diving-groups')
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
  @Post('/')
  async create(@Res() res, @Body() createItem: DivingGroupDto) {
    const result = await this.service.createDivingGroup(createItem);
    return res.status(HttpStatus.OK).json(result);
  }
  @Post('/add-diver')
  async addDiver(@Res() res, @Body() createItem: AddDiverToDivingGroupDto) {
    const result = await this.service.addDiverToDivingGroup(createItem);
    return res.status(HttpStatus.OK).json(result);
  }
}
@ApiTags('diving-groups')
@Controller('diving-groups')
export class DivingGroupsController {
  constructor(private readonly service: DivingGroupsService) {}
}
