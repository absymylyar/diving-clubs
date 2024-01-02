import { Injectable } from '@nestjs/common';
import { BaseService } from '../@core/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Monitor } from 'src/@models/monitor';
import { MonitorEntity } from 'src/@datas/MonitorEntity';
import { PersonsService } from 'src/persons/persons.service';
import { MonitorDto } from 'src/@model-dto/monitor-dto';
import { PersonEntity } from 'src/@datas/PersonEntity';

@Injectable()
export class MonitorsService extends BaseService<MonitorEntity> {
  constructor(
    @InjectRepository(MonitorEntity)
    protected readonly repository: Repository<MonitorEntity>,
    protected readonly dataSource: DataSource,
    private readonly personsService: PersonsService,
  ) {
    super(dataSource);
  }

  async getMonitors(): Promise<MonitorDto[]> {
    const montitors = await this.repository.find();
    return this.mapEntityToDto(...montitors);
  }

  async getMonitor(id: number): Promise<MonitorDto> {
    const monitor = await this.repository.findOneBy({ id });
    return this.mapEntityToDto(monitor)?.[0];
  }

  private mapEntityToDto(...entities: MonitorEntity[]): MonitorDto[] {
    return entities.map((entity) => ({
      ...entity.person,
      monitorNumber: entity.id,
      rank: entity.rank,
    }));
  }

  async saveMonitor(monitor: MonitorDto): Promise<Monitor> {
    const person = this.personsService.mapPersonEntity(
      await this.personsService.savePerson(monitor),
    );

    let entity = new MonitorEntity();
    entity.person = person;
    //entity.id = monitor.monitorNumber;
    entity.rank = monitor.rank;

    console.info(entity);
    entity = await this.saveEntity(entity);
    console.info(entity);
    return this.mapEntityToDto(entity)?.[0];
  }
}
