import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenceEntity } from 'src/@datas/LicenceEntity';
import { DivingClubsModule } from 'src/diving-clubs/diving-clubs-module';
import { PersonsModule } from 'src/persons/persons.module';
import { LicenceController, LicencesController } from './licences.controller';
import { LicencesService } from './licences.service';

@Module({
  imports: [
    PersonsModule,
    DivingClubsModule,
    TypeOrmModule.forFeature([LicenceEntity]),
  ],
  providers: [LicencesService],
  controllers: [LicencesController, LicenceController],
  exports: [LicencesService],
})
export class LicencesModule {}
