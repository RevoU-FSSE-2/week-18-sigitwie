import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';

class Task extends Model {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: string;
  public priority!: string;
  public dueDate?: Date;
  public assignedTo!: string;
  public projectId!: string;
}

Task.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: new DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: new DataTypes.ENUM('New', 'In Progress', 'Completed'),
    defaultValue: 'New',
    allowNull: false,
  },
  priority: {
    type: new DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id',
    },
  },
}, {
  tableName: 'tasks',
  sequelize,
});

// Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

// sequelize.afterDefine(() => {
//   const Project = sequelize.models.Project;
//   Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

//   // Setting up the association with Comment
//   Task.hasMany(Comment, {
//     foreignKey: 'taskId',
//     as: 'comments'  // This allows you to access Task's comments using the alias 'comments'
//   });
// });

export default Task;
