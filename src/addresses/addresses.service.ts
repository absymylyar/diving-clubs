import { Injectable } from '@nestjs/common';
import { Address } from '../@models/address';
import { BaseService } from '../@core/base-service';
import { AddressPatchDto } from 'src/@model-dto/address-patch-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from '../@datas/AddressEntity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AddressesService extends BaseService<Address> {
  // protected override models: Address[] = [
  //   {
  //     city: 'Rennes',
  //     id: 1,
  //     street: 'Rue de la mer',
  //     streetNumber: '123 bis',
  //     zipCode: '35000',
  //   },
  // ];

  constructor(
    @InjectRepository(AddressEntity)
    protected readonly repository: Repository<AddressEntity>,
    protected readonly dataSource: DataSource,
  ) {
    super(dataSource);
  }

  getAddresses(): Promise<Address[]> {
    return this.repository.find();
  }

  getAddress(id: number): Promise<Address> {
    return this.repository.findOneBy({ id });
  }

  async saveAdress(address: Address): Promise<Address> {
    return (await this.saveEntities(address))?.[0];
  }
  async patchAddress(address: AddressPatchDto): Promise<Address> {
    let result =
      (await this.getAddress(address.id)) ??
      (await this.saveAdress({
        city: address.city ?? '',
        street: address.street ?? '',
        streetNumber: address.streetNumber ?? '',
        zipCode: address.zipCode ?? '',
      }));
    result = Object.keys(address).reduce(
      (prev, curr) => (prev[curr] = address[curr]),
      result,
    );
    return this.saveAdress(result);
  }
  async deleteAddress(id: number): Promise<Address> {
    const result = await this.getAddress(id);
    await this.repository.delete(id);
    return result;
  }
}
