import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/@core/base-service';
import { DivingGroupEntity } from 'src/@datas/DivingGroupEntity';
import { DivingGroupModel } from 'src/@models/diving-group-model';
import { MonitorModel } from 'src/@models/monitor';
import { DivingClubsService } from 'src/diving-clubs/diving-clubs.service';
import { MonitorsService } from 'src/monitors/monitors.service';
import { PersonsService } from 'src/persons/persons.service';
import { DataSource, Repository } from 'typeorm';

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
