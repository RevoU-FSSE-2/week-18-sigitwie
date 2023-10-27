import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';
import Role from './Role';

class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public roleId!: number;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
}, {
  tableName: 'users',
  sequelize,
});

// User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

export default User;
