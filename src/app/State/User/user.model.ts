import { AuthUser } from "src/app/models/AuthUser";


export interface User extends AuthUser {
}
export function createUser(params: Partial<User>) {
    return {} as User;
  }