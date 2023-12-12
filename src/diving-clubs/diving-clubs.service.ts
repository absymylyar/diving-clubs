import { Injectable } from '@nestjs/common';
import { DivingClub } from '../@models/diving-club';
import { BaseService } from '../@core/base-service';
import { AddressesService } from '../addresses/addresses.service';
import { DivingClubPatchDto } from '../@model-dto/diving-club-patch-dto';
import { AddressPatchDto } from 'src/@model-dto/address-patch-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DivingClubEntity } from '../@datas/DivingClubEntity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DivingClubsService extends BaseService<DivingClub> {
  constructor(
    @InjectRepository(DivingClubEntity)
    protected readonly repository: Repository<DivingClubEntity>,
    protected readonly dataSource: DataSource,
    private readonly addressService: AddressesService,
  ) {
    super(dataSource);
  }

  getDivingClubs(): Promise<DivingClub[]> {
    return this.repository.find();
  }

  getDivingClub(id: number): Promise<DivingClub> {
    return this.repository.findOneBy({ id });
  }

  async saveDivingClub(club: DivingClub): Promise<DivingClub> {
    return (await this.saveEntities(club))?.[0];
  }

  async patchDivingClub(club: DivingClubPatchDto): Promise<DivingClub> {
    let result: DivingClub = await this.getDivingClub(club.id);
    result.name = club.name ?? result.name;
    result = Object.keys(club).reduce(
      (prev: DivingClub, key: string) =>
        this.mapPatchDivingClub(prev, key, club),
      result,
    );
    return result;
  }

  async deleteDivingClub(id: number): Promise<DivingClub> {
    const result = await this.getDivingClub(id);
    await this.repository.delete(id);
    return result;
  }
  private mapPatchDivingClub(
    prev: DivingClub,
    key: string,
    club: DivingClubPatchDto,
  ): DivingClub {
    if (club[key] instanceof AddressPatchDto) {
      prev[key] = this.addressService.patchAddress(club[key]);
    } else {
      return prev;
    }
  }
}
