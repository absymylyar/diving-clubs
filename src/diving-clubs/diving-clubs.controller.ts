import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { DivingClubsService } from './diving-clubs.service';
import { DivingClubDto } from '../@models/diving-club-dto';

@Controller('diving-club')
export class DivingClubController {
  constructor(private readonly service: DivingClubsService) {}

  @Get('/:id')
  async getDivingClub(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const result = await this.service.getDivingClub(id);
    if (!result) {
      throw new NotFoundException('Diving club does not exist!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/')
  async create(@Res() res, @Body() createItem: DivingClubDto) {
    const newItem = await this.service.saveDivingClub(createItem);
    return res.status(HttpStatus.OK).json({
      message: 'Diving club has been submitted successfully!',
      item: newItem,
    });
  }

  @Put('/:id')
  async editDivingClub(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedItem: DivingClubDto,
  ) {
    if (updatedItem.id !== id) {
      throw new NotFoundException('Id not the same');
    }
    const editedItem = await this.service.saveDivingClub({
      ...updatedItem,
      id,
    });
    if (!editedItem) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo: editedItem,
    });
  }

  @Delete('/:id')
  async deleteDivingClub(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const deletedItem = await this.service.deleteDivingClub(id);
    if (!deletedItem) {
      throw new NotFoundException('Diving club does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Diving club has been deleted!',
      todo: deletedItem,
    });
  }
}

@Controller('diving-clubs')
export class DivingClubsController {
  constructor(private readonly service: DivingClubsService) {}

  @Get('/')
  async getDivingClubs(@Res() res) {
    const result = await this.service.getDivingClubs();
    return res.status(HttpStatus.OK).json(result);
  }
}
