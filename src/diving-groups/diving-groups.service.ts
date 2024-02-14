import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/@core/base-service';
import { DivingGroupEntity } from 'src/@datas/DivingGroupEntity';
import { DivingGroupModel } from 'src/@models/diving-group-model';
import { MonitorModel } from 'src/@models/monitor';
import { DivingClubsService } from 'src/diving-clubs/diving-clubs.service';
import { MonitorsService } from 'src/monitors/monitors.service';
import { PersonsService } from 'src/persons/persons.service';
import { DivingGroupDto } from '../@model-dto/diving-group-dto';
import { MonitorException } from '../@exceptions/monitor-exception';
import { DataSource, Repository } from 'typeorm';
import { DivingClubEntity } from 'src/@datas/DivingClubEntity';
import { AddDiverToDivingGroupDto } from 'src/@model-dto/add-diver-to-diving-group-dto';
import { Person } from 'src/@models/person';
import {
  DiverException,
  DiverExceptionType,
} from 'src/@exceptions/diver-exception';
import { PersonEntity } from 'src/@datas/PersonEntity';
import { ViewDivingGroupWithCountDivers } from 'src/@datas/ViewDivingGroupWithCountDivers';

@Injectable()
export class DivingGroupsService extends BaseService<DivingGroupEntity> {
  constructor(
    @InjectRepository(DivingGroupEntity)
    protected readonly repository: Repository<DivingGroupEntity>,
    protected readonly dataSource: DataSource,
    private readonly personsService: PersonsService,
    private readonly divingClubsService: DivingClubsService,
    private readonly monitorsService: MonitorsService,
  ) {
    super(dataSource);
  }

  async getDivingGroups(): Promise<DivingGroupModel[]> {
    return this.mapEntitiesToModels(...(await this.repository.find()));
  }

  async getDivingGroup(id: number): Promise<DivingGroupModel> {
    return (
      await this.mapEntitiesToModels(await this.repository.findOneBy({ id }))
    )?.[0];
  }

  getDivingGroupWithDivers(): Promise<ViewDivingGroupWithCountDivers[]> {
    return this.dataSource.manager.find(ViewDivingGroupWithCountDivers);
  }

  async addDiverToDivingGroup(
    dto: AddDiverToDivingGroupDto,
  ): Promise<Person[]> {
    const dg = await this.repository.findOneBy({ id: dto.divingGroupId });
    if (!dg) {
      throw new NotFoundException('Diving group does not exist!');
    }
    const diver = (await this.personsService.getPerson(
      dto.diverId,
    )) as PersonEntity;
    if (!diver) {
      throw new NotFoundException('Diver does not exist!');
    }
    const licence = await this.personsService.getPersonActiveLicence(
      dto.diverId,
      dg.date,
    );
    if (!licence) {
      throw new DiverException(DiverExceptionType.MissingLicence);
    }
    if (licence.rank < dg.minimumRank) {
      throw new DiverException(DiverExceptionType.MissingRank);
    }
    const divers = [...(await dg.divers), licence];
    dg.divers = Promise.resolve(divers);
    const toto = await this.saveEntity(dg);
    console.info(toto);
    return divers?.map(({ person }) => person);
  }

  async createDivingGroup(dto: DivingGroupDto): Promise<DivingGroupModel> {
    const monitor = await this.monitorsService.getMonitorEntity(dto.monitorId);
    if (!monitor) {
      throw new NotFoundException('Monitor does not exist!');
    }
    if (monitor.rank < dto.minimumRank) {
      throw new MonitorException();
    }
    let entity = new DivingGroupEntity();
    entity.monitor = monitor;
    entity.club = (await this.divingClubsService.getDivingClub(
      dto.clubId,
    )) as DivingClubEntity;
    entity.minimumRank = dto.minimumRank;
    entity.date = dto.date;
    entity = await this.saveEntity(entity);
    console.info(entity);
    return this.getDivingGroup(entity.id);
  }

  private async mapEntityToModel(
    entity: DivingGroupEntity,
  ): Promise<DivingGroupModel> {
    return (await this.mapEntitiesToModels(entity))?.[0];
  }

  private async mapEntitiesToModels(
    ...models: DivingGroupEntity[]
  ): Promise<DivingGroupModel[]> {
    const monitors: { [id: number]: MonitorModel } = (
      await this.monitorsService.getMonitors(
        ...models?.map(({ monitor }) => monitor.id),
      )
    ).reduce((hh, curr) => {
      hh[curr.id] = curr;
      return hh;
    }, {});

    return models.map((dg) => ({
      ...dg,
      monitor: monitors[dg.monitor?.id],
    }));
  }
}
