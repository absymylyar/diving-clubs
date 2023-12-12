import { DataSource } from 'typeorm';
import { Identifier } from '../@models/Identifier';

export abstract class BaseService<TModel extends Identifier> {
  protected models: TModel[] = [];

  constructor(protected readonly dataSource: DataSource) {}

  async saveEntities(...models: TModel[]) {
    let result: TModel[];
    await this.dataSource.transaction(async (manager) => {
      result = await Promise.all(
        models?.map(async (m) => await manager.save(m)),
      );
    });
    return result;
  }

  // protected getNextId(models: TModel[]): number {
  //   return models.reduce(
  //     (prev, curr) => (prev < curr.id ? curr.id : prev),
  //     models?.[0]?.id ?? 1,
  //   );
  // }

  // async saveModel(model: TModel): Promise<TModel> {
  //   return model.id ? this.update(model) : this.add(model);
  // }

  // protected async add(model: TModel): Promise<TModel> {
  //   const result: TModel = {
  //     ...model,
  //     id: this.getNextId(this.models),
  //   };
  //   this.models = [...(this.models ?? []), result];
  //   return result;
  // }

  // protected async update(model: TModel): Promise<TModel> {
  //   let result = (await this.findOne(model.id)) ?? (await this.add(model));
  //   result = {
  //     ...model,
  //     id: result.id,
  //   };
  //   this.models = [...this.models.filter((x) => x.id !== model.id), result];
  //   return model;
  // }

  // protected async remove(id: number): Promise<TModel> {
  //   const result = this.findOne(id);
  //   this.models = this.models.filter((model) => model.id !== id);
  //   return result;
  // }

  // protected async findAll(): Promise<TModel[]> {
  //   return this.repository.find();
  // }

  // protected async findOne(id: number): Promise<TModel | null> {
  //   return this.repository.findOneBy({ id });
  //   // return this.models.find((model) => model.id === id);
  // }
}
