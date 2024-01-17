import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PersonsModule } from 'src/persons/persons.module';
import { MonitorEntity } from 'src/@datas/MonitorEntity';
import { MonitorsService } from './monitors.service';
import { MonitorsControler } from './monitors.controler';

@Module({
  imports: [PersonsModule, TypeOrmModule.forFeature([MonitorEntity])],
  providers: [MonitorsService],
  controllers: [MonitorsControler],
  exports: [MonitorsService],
})
export class MonitorsModule {}
