import UsersModel from '../database/models/UsersModel';
import { IUsers } from '../Interfaces/IUsers';
import { IUsersModel } from '../Interfaces/IUsersModel';

export default class UserModel implements IUsersModel {
  private model = UsersModel;

  async findByEmail(email: IUsers['email']): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }
}
