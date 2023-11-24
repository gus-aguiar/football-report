import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import TeamModel from '../database/models/TeamsModel';
import { NewEntity } from '../Interfaces';
import ILeaderboard from '../Interfaces/ILeaderboard';
import {
  leaderboardQueryHomeTeams,
  leaderboardQueryAwayTeams,
  leaderboardQuery,
} from '../utils/LeaderboardHandle';

export default class MatchModel implements IMatchesModel {
  private model = MatchesModel;
  private teamsmodel = TeamModel;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll();
    const teamsData = await this.teamsmodel.findAll();

    return dbData
      .map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => {
        const homeTeam = teamsData.find((team) => team.id === homeTeamId);
        const awayTeam = teamsData.find((team) => team.id === awayTeamId);

        return {
          id,
          homeTeamId,
          homeTeamGoals,
          awayTeamId,
          awayTeamGoals,
          inProgress,
          homeTeam: homeTeam ? { teamName: homeTeam.teamName } : null,
          awayTeam: awayTeam ? { teamName: awayTeam.teamName } : null,
        };
      });
  }

  async findById(ide: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(ide);
    if (dbData == null) return null;

    const
      { id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress }: IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async finishMatch(id: IMatches['id']): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(data: NewEntity<IMatches>): Promise<IMatches> {
    const dbData = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }:
    IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async getLeaderboardHomeTeam(): Promise<ILeaderboard[]> {
    const leaderboard = await
    this.model.sequelize?.query(leaderboardQueryHomeTeams, { type: 'SELECT' });
    return leaderboard as unknown as ILeaderboard[];
  }

  async getLeaderboardAwayTeam(): Promise<ILeaderboard[]> {
    const leaderboard = await
    this.model.sequelize?.query(leaderboardQueryAwayTeams, { type: 'SELECT' });
    return leaderboard as unknown as ILeaderboard[];
  }

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboard = await
    this.model.sequelize?.query(leaderboardQuery, { type: 'SELECT' });
    return leaderboard as unknown as ILeaderboard[];
  }
}
