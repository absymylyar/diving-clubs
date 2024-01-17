import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingClubEntity } from '../@datas/DivingClubEntity';
import { DivingClubsService } from './diving-clubs.service';
import {
  DivingClubController,
  DivingClubsController,
} from './diving-clubs.controller';
import { Module } from '@nestjs/common';
import { AddressesModule } from '../addresses/addresses-module';

@Module({
  imports: [AddressesModule, TypeOrmModule.forFeature([DivingClubEntity])],
  providers: [DivingClubsService],
  controllers: [DivingClubsController, DivingClubController],
  exports: [DivingClubsService],
})
export class DivingClubsModule {}
