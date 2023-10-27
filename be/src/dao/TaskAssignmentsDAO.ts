import Task from '../models/Task';
import TaskAssignments from '../models/TaskAssignment';
import User from '../models/User';

class TaskAssignmentsDAO {

  async createAssignment(assignmentData: { userId: string, taskId: string, role: string }): Promise<TaskAssignments> {
    try {
      const assignment = await TaskAssignments.create(assignmentData);
      return assignment;
    } catch (error) {
      throw error;
    }
  }

  async getAssignmentById(id: string): Promise<TaskAssignments | null> {
    try {
      const assignment = await TaskAssignments.findByPk(id, {
        include: [
          { model: User, as: 'user', attributes: ['username'] },
          { model: Task, as: 'task' }
        ]  // Include user and task data
      });
      return assignment;
    } catch (error) {
      throw error;
    }
  }

  async updateAssignment(id: string, updateData: Partial<{ userId: string, taskId: string, role: string }>): Promise<number> {
    try {
      const affectedCount = await TaskAssignments.update(updateData, {
        where: { id }
      });
      return affectedCount[0];
    } catch (error) {
      throw error;
    }
}

  async deleteAssignment(id: string): Promise<void> {
    try {
      await TaskAssignments.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new TaskAssignmentsDAO();
