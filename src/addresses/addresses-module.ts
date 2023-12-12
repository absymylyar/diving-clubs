import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { AddressEntity } from '../@datas/AddressEntity';
import { AddressController, AddressesController } from './addresses.controler';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressesService],
  controllers: [AddressesController, AddressController],
  exports: [AddressesService],
})
export class AddressesModule {}
