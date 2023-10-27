import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';
import User from './User';
import Project from './Project';

class ProjectRoles extends Model {
  public id!: string;
  public userId!: string;
  public projectId!: string;
  public role!: string;  // 'Project Manager' atau 'Team Member'
}

ProjectRoles.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'id',
    },
  },
  role: {
    type: new DataTypes.ENUM('Project Manager', 'Team Member'),
    allowNull: false,
  },
}, {
  tableName: 'project_roles',
  sequelize,
});

export default ProjectRoles;