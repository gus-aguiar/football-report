import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const MatchesController = new MatchController();

const router = Router();

router.get('/home', (req: Request, res: Response) => MatchesController.getLeaderboard(req, res));

export default router;
