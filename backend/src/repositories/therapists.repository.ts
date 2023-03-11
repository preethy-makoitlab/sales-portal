import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Therapists, TherapistsRelations} from '../models';

export class TherapistsRepository extends DefaultCrudRepository<
  Therapists,
  typeof Therapists.prototype.id,
  TherapistsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Therapists, dataSource);
  }
}
