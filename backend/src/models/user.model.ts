import {Entity, model, property} from '@loopback/repository';

@model({settings: {collection:"user"}})
export class User extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'},
    generated:true
  })
  id?: string;

constructor(data?: Partial<User>) {
  super(data);
}

}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
