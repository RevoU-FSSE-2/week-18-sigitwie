import Comment from '../models/Comment';
import  User  from '../models/User';
import Task from '../models/Task';

class CommentDAO {
  
  async createComment(commentData: { content: string, userId: string, taskId: string }) {
    try {
      const comment = await Comment.create(commentData);
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentById(id: string) {
    try {
      const comment = await Comment.findByPk(id, {
        include: [
          { model: User, as: 'commenter', attributes: ['username'] },
          { model: Task, as: 'task' }
        ]  // Include user and task data
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(id: string, updateData: Partial<{ content: string, userId: string, taskId: string }>) {
    try {
      const comment = await Comment.update(updateData, {
        where: { id }
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(id: string) {
    try {
      await Comment.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new CommentDAO();
