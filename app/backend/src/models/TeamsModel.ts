import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = TeamsModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(ide: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(ide);
    if (dbData == null) return null;

    const { id, teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
