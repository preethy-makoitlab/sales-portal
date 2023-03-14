import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Content, ContentRelations} from '../models';

export class ContentRepository extends DefaultCrudRepository<
  Content,
  typeof Content.prototype._id,
  ContentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Content, dataSource);
  }
}
