import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

// router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.get('/', (req: Request, res: Response) => {
  if (req.query.inProgress === 'true') {
    matchesController.getMatchesInProgress(req, res);
  } else if (req.query.inProgress === 'false') {
    matchesController.getMatchesNotInProgress(req, res);
  } else {
    matchesController.getAllMatches(req, res);
  }
});

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) =>
    matchesController.finishMatch(req, res),
);

router.get('/:id', (req: Request, res: Response) => matchesController.getMatchesById(req, res));

export default router;
