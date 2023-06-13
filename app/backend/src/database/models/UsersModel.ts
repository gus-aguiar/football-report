import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
} from 'sequelize';
import db from '.';

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: number;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'users',
});

export default Users;
