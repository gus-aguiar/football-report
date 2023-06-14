import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.get('/:id', (req: Request, res: Response) => matchesController.getMatchesById(req, res));

export default router;
