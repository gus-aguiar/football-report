import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getMatchesInProgress(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getMatchesInProgress();
    res.status(200).json(serviceResponse.data);
  }

  public async getMatchesNotInProgress(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getMatchesNotInProgress();
    res.status(200).json(serviceResponse.data);
  }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }

  public async getMatchesById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.getMatchesById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchesService.finishMatch(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.createMatch(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboardHomeTeam(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getLeaderboardHomeTeam();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboardAwayTeam(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getLeaderboardAwayTeam();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getLeaderboard();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
