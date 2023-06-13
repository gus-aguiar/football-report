import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
} from 'sequelize';
import db from '.';

class Teams extends Model<InferAttributes<Teams>, InferCreationAttributes<Teams>> {
  declare id: number;

  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'teams',
    underscored: true,
    timestamps: false,
    sequelize: db,
  },
);

export default Teams;
