import { Injectable } from '@nestjs/common';
import { Address } from '../@models/address';
import { BaseService } from '../@core/base-service';
import { AddressPatchDto } from 'src/@model-dto/address-patch-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from '../@datas/AddressEntity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AddressesService extends BaseService<Address> {
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

  async saveAddress(address: Address): Promise<Address> {
    let entity = new AddressEntity();
    entity = Object.keys(address).reduce((e, key) => {
      e[key] = address[key];
      return e;
    }, entity);
    return (await this.saveEntities(entity))?.[0];
  }
  async patchAddress(address: AddressPatchDto): Promise<Address> {
    let result =
      (await this.getAddress(address.id)) ??
      (await this.saveAddress({
        city: address.city ?? '',
        street: address.street ?? '',
        streetNumber: address.streetNumber ?? '',
        zipCode: address.zipCode ?? '',
      }));
    result = Object.keys(address).reduce(
      (prev, curr) => (prev[curr] = address[curr]),
      result,
    );
    return this.saveAddress(result);
  }
  async deleteAddress(id: number): Promise<Address> {
    const result = await this.getAddress(id);
    await this.repository.delete(id);
    return result;
  }
}
