import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import matchesRouter from './matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;
