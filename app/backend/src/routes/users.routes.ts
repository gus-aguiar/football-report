import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import Validations from '../middlewares/Validations';

const loginController = new LoginController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => loginController.login(req, res));

export default router;
