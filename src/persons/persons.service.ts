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

    // const addressEntity = new AddressEntity();

    // addressEntity.street = person.address.streetNumber;
    // addressEntity.street = person.address.street;
    // addressEntity.city = person.address.city;
    // addressEntity.zipCode = person.address.zipCode;
    // personEntity.address = addressEntity;
    // personEntity.firstName = person.firstName;
    // personEntity.lastName = person.lastName;
    // personEntity.phoneNumber = person.phoneNumber;
    // personEntity.birthDate = person.birthDate;
    // personEntity.bloodGroup = person.bloodGroup;
    // return await this.repository.save(personEntity);
    // // return (await this.saveEntities(person))?.[0];
  }

  // async patchPerson(person: PersonPatchDto): Promise<Person> {
  //   let result: Person = await this.getPerson(person.id);
  //   result.firstName = person.firstName ?? result.firstName;
  //   result = Object.keys(person).reduce(
  //     (prev: Person, key: string) => this.mapPatchPerson(prev, key, person),
  //     result,
  //   );
  //   return result;
  // }

  async deletePerson(id: number): Promise<Person> {
    const result = await this.getPerson(id);
    await this.repository.delete(id);
    return result;
  }
  private mapPatchPerson(
    prev: PersonEntity,
    key: string,
    person: PersonPatchDto,
  ): PersonEntity {
    if (person[key] instanceof AddressPatchDto) {
      prev[key] = this.addressService.mapAddress(person[key]);
    } else {
      prev[key] = person[key];
    }
    return prev;
  }
}
