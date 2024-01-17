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
import { LicencesService } from './licences.service';
import { LicenceDto } from 'src/@model-dto/licence-dto';

@Controller('licence')
export class LicenceController {
  constructor(private readonly service: LicencesService) {}

  @Get('/:id/:personId')
  async getDivingClub(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Param('personId', ParseIntPipe) personId: number,
  ) {
    const result = await this.service.getLicence(id, personId);
    if (!result) {
      throw new NotFoundException('Licence does not exist!');
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/')
  async create(@Res() res, @Body() createItem: LicenceDto) {
    const newItem = await this.service.createLicence(createItem);
    return res.status(HttpStatus.OK).json({
      message: 'Diving club has been submitted successfully!',
      item: newItem,
    });
  }
}
@Controller('licences')
export class LicencesController {
  constructor(private readonly service: LicencesService) {}
  @Get('/')
  async getLicences(@Res() res) {
    const result = await this.service.getLicences();
    return res.status(HttpStatus.OK).json(result);
  }
}
