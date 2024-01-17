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
import { PersonsService } from './persons.service';
import { PersonDto } from '../@model-dto/person-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly service: PersonsService) {}

  @Get('/')
  async getPersons(@Res() res) {
    const result = await this.service.getPersons();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('/:id')
  async getPerson(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const result = await this.service.getPerson(id);
    if (!result) {
      throw new NotFoundException('Diving club does not exist!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/')
  async create(@Res() res, @Body() createItem: PersonDto) {
    const newItem = await this.service.savePerson(createItem);
    return res.status(HttpStatus.OK).json({
      message: 'Diving club has been submitted successfully!',
      item: newItem,
    });
  }

  @Put('/:id')
  async editTodo(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedItem: PersonDto,
  ) {
    if (updatedItem.id !== id) {
      throw new NotFoundException('Id not the same');
    }
    const editedItem = await this.service.savePerson({
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
  async deleteTodo(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const deletedItem = await this.service.deletePerson(id);
    if (!deletedItem) {
      throw new NotFoundException('Diving club does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Diving club has been deleted!',
      todo: deletedItem,
    });
  }
}
