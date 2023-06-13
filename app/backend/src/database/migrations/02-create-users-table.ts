import { Model, QueryInterface, DataTypes } from 'sequelize';
import  IUsers  from '../../Interfaces/IUsers';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUsers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        field: 'username',
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        field: 'role',
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        field: 'email',
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        field: 'password',
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};
