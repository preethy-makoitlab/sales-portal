import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    name: string;
    id?: string;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
