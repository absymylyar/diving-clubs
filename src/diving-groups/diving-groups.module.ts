import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingGroupEntity } from 'src/@datas/DivingGroupEntity';
import { DivingClubsModule } from 'src/diving-clubs/diving-clubs-module';
import { MonitorsModule } from 'src/monitors/monitors.module';
import { PersonsModule } from 'src/persons/persons.module';
import { DivingGroupsService } from './diving-groups.service';
import {
  DivingGroupController,
  DivingGroupsController,
} from './diving-groups.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PersonsModule,
    MonitorsModule,
    DivingClubsModule,
    TypeOrmModule.forFeature([DivingGroupEntity]),
  ],
  providers: [DivingGroupsService],
  controllers: [DivingGroupController, DivingGroupsController],
  exports: [DivingGroupsService],
})
export class DivingGroupsModule {}
