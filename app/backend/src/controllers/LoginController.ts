import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private userService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
