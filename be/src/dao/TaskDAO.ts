import Task from "../models/Task";
import Comment from "../models/Comment";
import User from "../models/User";
import Project from "../models/Project";
import { Op } from "sequelize";
import { setupAssociations } from "../models/association";

setupAssociations();
class TaskDAO {
  async createTask(taskData: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: Date;
    assignedTo: string;
    projectId: string;
  }) {
    try {
      const task = await Task.create(taskData);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id: string) {
    try {
      const task = await Task.findByPk(id, {
        include: [
          { model: User, as: "assignee", attributes: ["username"] },
          { model: Comment, as: "comments" },
        ],
      });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(
    id: string,
    updateData: Partial<{
      title: string;
      description?: string;
      status?: string;
      priority?: string;
      dueDate?: Date;
      assignedTo: string;
      projectId: string;
    }>
  ) {
    try {
      const task = await Task.update(updateData, {
        where: { id },
      });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id: string) {
    try {
      await Task.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllTasksForUser(userId: string) {
    try {
      const tasks = await Task.findAll({
        where: {
          // This OR condition checks if user is
          [Op.or]: [
            { assignedTo: userId },
            { '$managerId$': userId }
          ],
        },
        include: [
          {
            model: User,
            as: "assignee",
            attributes: ["username"],
          },
          {
            model: Project,
            as: "project",
            attributes: ["name"],
          },
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: User,
                as: "commenter",
                attributes: ["username"],
              },
            ],
          },
        ],
      });
      return tasks;
    } catch (error) {
      throw error;
    }
  }
}

export default new TaskDAO();
