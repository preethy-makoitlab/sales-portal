import { generateUniqueId, uuid } from '@loopback/core';
import {Entity, model, property} from '@loopback/repository';

@model()
export class Therapists extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
    default: generateUniqueId
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  u_id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  contactNo: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: Date,
    required: true,
  })
  dob: Date;

  @property.array({
    type: 'string'
  })
  qualification: string[];

  constructor(data?: Partial<Therapists>) {
    super(data);
  }
}

export interface TherapistsRelations {
  // describe navigational properties here
}

export type TherapistsWithRelations = Therapists & TherapistsRelations;
