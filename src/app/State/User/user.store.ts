import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

export interface UserState extends EntityState<User, number|string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'products' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super();
  }
}