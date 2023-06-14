import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import Validations from '../middlewares/Validations';

const loginController = new LoginController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => loginController.login(req, res));
router.get('/role', Validations.validateToken, (req: Request, res: Response) => {
  res.status(200).json({ role: res.locals.user.role });
});

export default router;
