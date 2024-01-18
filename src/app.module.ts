import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingClubsModule } from './diving-clubs/diving-clubs-module';
import { AddressEntity } from './@datas/AddressEntity';
import { DivingClubEntity } from './@datas/DivingClubEntity';
import { AddressesModule } from './addresses/addresses-module';
import { PersonsModule } from './persons/persons.module';
import { PersonEntity } from './@datas/PersonEntity';
import { MonitorsModule } from './monitors/monitors.module';
import { MonitorEntity } from './@datas/MonitorEntity';
import { LicenceEntity } from './@datas/LicenceEntity';
import { DivingGroupEntity } from './@datas/DivingGroupEntity';
import { DivingGroupsModule } from './diving-groups/diving-groups.module';
import { LicencesModule } from './licences/licences.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'SURFACE-DAVID\\SQLEXPRESS',
      port: 1433,
      username: 'sa',
      password: '123456pw$',
      database: 'DivingClubs',
      options: {
        trustServerCertificate: true,
        useUTC: true,
      },
      // TypeOrmModule.forRoot({
      //   type: 'mssql',
      //   host: 'DAVID-PC-DEC16\\SQLEXPRESS',
      //   port: 1433,
      //   username: 'sa',
      //   password: '$StarWars$2021',
      //   database: 'DivingClubs',
      //   options: {
      //     trustServerCertificate: true,
      //     useUTC: true,
      //   },
      entities: [
        AddressEntity,
        DivingClubEntity,
        PersonEntity,
        MonitorEntity,
        LicenceEntity,
        DivingGroupEntity,
      ],
      synchronize: true,
    }),
    DivingClubsModule,
    AddressesModule,
    PersonsModule,
    MonitorsModule,
    LicencesModule,
    DivingGroupsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
