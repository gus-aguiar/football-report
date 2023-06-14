import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import TeamModel from '../database/models/TeamsModel';

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
}