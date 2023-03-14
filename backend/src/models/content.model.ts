import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Content extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  _id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'object',
  })
  file?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Content>) {
    super(data);
  }
}

export interface ContentRelations {
  // describe navigational properties here
}

export type ContentWithRelations = Content & ContentRelations;
