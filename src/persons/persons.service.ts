import { Injectable } from '@nestjs/common';
import { BaseService } from '../@core/base-service';
import { AddressPatchDto } from 'src/@model-dto/address-patch-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Person } from '../@models/person';
import { PersonEntity } from '../@datas/PersonEntity';
import { PersonPatchDto } from '../@model-dto/person-patch-dto';
import { PersonDto } from '../@model-dto/person-dto';
import { AddressesService } from '../addresses/addresses.service';
import { AddressDto } from 'src/@models/address-dto';
import { LicenceEntity } from 'src/@datas/LicenceEntity';

@Injectable()
export class PersonsService extends BaseService<Person> {
  constructor(
    @InjectRepository(PersonEntity)
    protected readonly repository: Repository<PersonEntity>,
    protected readonly dataSource: DataSource,
    private readonly addressService: AddressesService,
  ) {
    super(dataSource);
  }

  getPersons(): Promise<Person[]> {
    return this.repository.find();
  }

  getPerson(id: number): Promise<Person> {
    return this.repository.findOneBy({ id });
  }

  async savePerson(person: PersonDto): Promise<Person> {
    let personEntity = new PersonEntity();
    personEntity = Object.keys(person).reduce(
      (prev, key) => this.mapPatchPerson(prev, key, person),
      personEntity,
    );
    return this.saveEntity(personEntity);
  }

  async deletePerson(id: number): Promise<Person> {
    const result = await this.getPerson(id);
    await this.repository.delete(id);
    return result;
  }
  async getPersonLicences(id: number): Promise<LicenceEntity[]> {
    return (await this.repository.findOneBy({ id })).licences;
  }
  mapPersonEntity(person: Person): PersonEntity {
    return Object.keys(person).reduce(
      (prev, key) => this.mapPatchPerson(prev, key, person),
      new PersonEntity(),
    );
  }
  private mapPatchPerson(
    prev: PersonEntity,
    key: string,
    person: PersonPatchDto,
  ): PersonEntity {
    if (
      person[key] instanceof AddressPatchDto ||
      person[key] instanceof AddressDto
    ) {
      prev[key] = this.addressService.mapAddress(person[key]);
    } else {
      prev[key] = person[key];
    }
    return prev;
  }
}
