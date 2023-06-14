import { IUsers } from './IUsers';

export interface IUsersModel {
  findByEmail(email: IUsers['email']): Promise<IUsers | null>,
}
