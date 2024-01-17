import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/@core/base-service';
import { DivingClubEntity } from 'src/@datas/DivingClubEntity';
import { LicenceEntity } from 'src/@datas/LicenceEntity';
import { PersonEntity } from 'src/@datas/PersonEntity';
import { LicenceDto } from 'src/@model-dto/licence-dto';
import { LicenceModel } from 'src/@models/licence-model';
import { DivingClubsService } from 'src/diving-clubs/diving-clubs.service';
import { PersonsService } from 'src/persons/persons.service';
import {
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class LicencesService extends BaseService<LicenceEntity> {
  constructor(
    @InjectRepository(LicenceEntity)
    protected readonly repository: Repository<LicenceEntity>,
    protected readonly dataSource: DataSource,
    private readonly personsService: PersonsService,
    private readonly clubsSErvice: DivingClubsService,
  ) {
    super(dataSource);
  }

  getLicences(): Promise<LicenceModel[]> {
    return this.repository.find();
  }

  async getLicence(id: number, personId: number): Promise<LicenceModel> {
    const result = await this.repository.find({
      where: {
        id,
        dateStart: MoreThanOrEqual(new Date()),
        dateEnd: LessThanOrEqual(new Date()),
        person: {
          id: personId,
        },
      },
    });
    return result?.[0];
  }

  async createLicence(dto: LicenceDto): Promise<LicenceModel> {
    const endDate = new Date(dto.startDate);
    endDate.setFullYear(endDate.getFullYear() + 2);

    const entity = new LicenceEntity();
    entity.club = (await this.clubsSErvice.getDivingClub(
      dto.clubId,
    )) as DivingClubEntity;
    entity.person = (await this.personsService.getPerson(
      dto.personId,
    )) as PersonEntity;
    entity.dateStart = dto.startDate;
    entity.dateEnd = endDate;
    entity.rank = dto.rank;

    const licences = (await this.getLicencesByPerson(dto.personId))
      .filter(({ dateEnd }) => {
        const de = new Date(dateEnd).getDate();
        return (
          new Date(entity.dateEnd).getDate() > de &&
          new Date(entity.dateStart).getDate() < de
        );
      })
      .map((l) => l as LicenceEntity);
    if (licences?.length > 0) {
      licences.forEach(async (l) => {
        l.dateEnd = entity.dateStart;
        await this.saveEntity(l);
      });
    }

    return this.saveEntity(entity);
  }
  getLicencesByPerson(personId: number): Promise<LicenceModel[]> {
    return this.repository.find({
      where: {
        person: {
          id: personId,
        },
      },
    });
  }
}
