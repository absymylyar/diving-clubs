import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { MonitorDto } from 'src/@model-dto/monitor-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('monitors')
@Controller('monitors')
export class MonitorsControler {
  constructor(private readonly service: MonitorsService) {}

  @Get('/')
  async getMonitors(@Res() res) {
    const result = await this.service.getMonitors();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/:id')
  async getMonitor(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const result = await this.service.getMonitor(id);
    if (!result) {
      throw new NotFoundException('Diving club does not exist!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/')
  async create(@Res() res, @Body() createItem: MonitorDto) {
    const newItem = await this.service.saveMonitor(createItem);
    return res.status(HttpStatus.OK).json({
      message: 'M%onitor has been submitted successfully!',
      item: newItem,
    });
  }

  @Put('/:id')
  async editTodo(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedItem: MonitorDto,
  ) {
    if (updatedItem.id !== id) {
      throw new NotFoundException('Id not the same');
    }
    const editedItem = await this.service.saveMonitor({
      ...updatedItem,
      id,
    });
    if (!editedItem) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Monitor has been successfully updated',
      todo: editedItem,
    });
  }
}
