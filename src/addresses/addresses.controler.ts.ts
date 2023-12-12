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
import { AddressesService } from './addresses.service';
import { AddressDto } from 'src/@models/address-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly service: AddressesService) {}

  @Get('/')
  async getAddresses(@Res() res) {
    const result = await this.service.getAddresses();
    return res.status(HttpStatus.OK).json(result);
  }
}
@ApiTags('addresses')
@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressesService) {}

  @Get('/:id')
  async getAddress(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const result = await this.service.getAddress(id);
    if (!result) {
      throw new NotFoundException('Address does not exist!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/')
  async create(@Res() res, @Body() createItem: AddressDto) {
    const newItem = await this.service.saveAddress(createItem);
    return res.status(HttpStatus.OK).json({
      message: 'Address has been submitted successfully!',
      item: newItem,
    });
  }
}
