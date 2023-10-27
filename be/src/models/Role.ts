import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';

class Role extends Model {
  public id!: number;
  public name!: 'Administrator' | 'ProjectManager' | 'TeamMember';
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  name: {
    type: DataTypes.ENUM('Administrator', 'ProjectManager', 'TeamMember'),
    allowNull: false,
  },
}, {
  tableName: 'roles',
  sequelize,
});

export default Role;
