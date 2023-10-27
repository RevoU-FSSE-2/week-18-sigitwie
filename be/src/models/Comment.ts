import { Model, DataTypes } from 'sequelize';
import sequelize from '../services/db';

class Comment extends Model {
  public id!: string;
  public content!: string;
  public userId!: string;
  public taskId!: string;
}

Comment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: new DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
}, {
  tableName: 'comments',
  sequelize,
});

export default Comment;
