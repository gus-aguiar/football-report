import { Model, QueryInterface, DataTypes } from 'sequelize';
import  ITeam  from '../../Interfaces/ITeams';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        field: 'team_name',
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};
