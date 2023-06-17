import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { NewEntity } from '../Interfaces';
import ILeaderboard from '../Interfaces/ILeaderboard';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesInProgress(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel
      .findAll();
    const inProgressMatches = allMatches.filter((match) => match.inProgress === true);
    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  public async getMatchesNotInProgress(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel
      .findAll();
    const inProgressMatches = allMatches.filter((match) => match.inProgress === false);
    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  public async getMatchesById(id: number): Promise<ServiceResponse<IMatches>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(match: NewEntity<IMatches>):
  Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, awayTeamId } = match;
    const homeTeam = await this.matchesModel.findById(homeTeamId);
    const awayTeam = await this.matchesModel.findById(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return {
        status: 'NOT_FOUND', data: { message: 'There is no team with such id!' },
      };
    }
    if (homeTeamId === awayTeamId) {
      return {
        status: 'EQUAL_TEAMS',
        data:
        { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const newMatch = await this.matchesModel.createMatch(match);
    return { status: 'CREATED', data: newMatch };
  }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.matchesModel.getLeaderboard();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
