import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';

class Project extends Model {
  public id!: string;
  public name!: string;
  public description?: string;
  public managerId!: string;
}

Project.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: new DataTypes.TEXT,
    allowNull: true,
  },
  managerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}, {
  tableName: 'projects',
  sequelize,
});

export default Project;
