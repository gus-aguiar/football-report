import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import { ILogin, IUsers } from '../Interfaces/IUsers';
import { IUsersModel } from '../Interfaces/IUsersModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUsersModel = new UsersModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUsers;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
  }
}
