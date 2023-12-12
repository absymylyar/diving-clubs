import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingClubEntity } from '../@datas/DivingClubEntity';
import { DivingClubsService } from './diving-clubs.service';
import { DivingClubsController } from './diving-clubs.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([DivingClubEntity])],
  providers: [DivingClubsService],
  controllers: [DivingClubsController],
})
export class DivingClubsModule {}
