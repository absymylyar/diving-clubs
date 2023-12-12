import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { AddressEntity } from '../@datas/AddressEntity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressesService],
})
export class AddressesModule {}
