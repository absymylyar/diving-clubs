import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PersonEntity } from '../@datas/PersonEntity';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { AddressesModule } from '../addresses/addresses-module';

@Module({
  imports: [AddressesModule, TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonsService],
  controllers: [PersonsController],
})
export class PersonsModule {}
