import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivingClubsController } from './diving-clubs/diving-clubs.controller';
import { DivingClubsService } from './diving-clubs/diving-clubs.service';
import { AddressesService } from './addresses/addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, DivingClubsController],
  providers: [AppService, DivingClubsService, AddressesService],
})
export class AppModule {}
