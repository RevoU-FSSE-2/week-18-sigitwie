import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';
import User from './User';
import Task from './Task';

class TaskAssignments extends Model {
  public id!: string;
  public userId!: string;
  public taskId!: string;
  public role!: string;  // 'Assignee' atau 'Reviewer'
}

TaskAssignments.init({
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
  taskId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Task,
      key: 'id',
    },
  },
  role: {
    type: new DataTypes.ENUM('Assignee', 'Reviewer'),
    allowNull: false,
  },
}, {
  tableName: 'task_assignments',
  sequelize,
});

export default TaskAssignments;
