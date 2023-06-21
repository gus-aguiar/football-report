import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const MatchesController = new MatchController();

const router = Router();

router.get('/home', (req: Request, res: Response) => MatchesController
  .getLeaderboardHomeTeam(req, res));
router.get('/away', (req: Request, res: Response) => MatchesController
  .getLeaderboardAwayTeam(req, res));
export default router;
