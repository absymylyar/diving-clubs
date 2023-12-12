import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivingClubsModule } from './diving-clubs/diving-clubs-module';
import { AddressEntity } from './@datas/AddressEntity';
import { DivingClubEntity } from './@datas/DivingClubEntity';
import { AddressesModule } from './addresses/addresses-module';

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
      entities: [AddressEntity, DivingClubEntity],
      synchronize: true,
    }),
    DivingClubsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
