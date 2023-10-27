import Project from "../models/Project";
import User from "../models/User";
import Task from "../models/Task";
import { Op } from "sequelize";

class ProjectDAO {
  async createProject(projectData: {
    name: string;
    description?: string;
    managerId: string;
  }) {
    try {
      const project = await Project.create(projectData);
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(id: string) {
    try {
      const project = await Project.findByPk(id, {
        include: [
          {
            model: User,
            as: "manager",
            attributes: ["username"],
          },
          {
            model: Task,
            as: "tasks",
          },
        ],
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjectsForUser(userId: string) {
    try {
      const projects = await Project.findAll({
        where: {
          // This OR condition checks if the user is either the manager or is associated with tasks in the project
          [Op.or]: [{ managerId: userId }, { "$tasks.assignedTo$": userId }],
        },
        include: [
          {
            model: User,
            as: "manager",
            attributes: ["username"],
          },
          {
            model: Task,
            as: "tasks",
            include: [
              {
                model: User,
                as: "assignee",
                attributes: ["username"],
                foreignKey: "assignedTo",
              },
            ],
          },
        ],
      });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    id: string,
    updateData: Partial<{
      name: string;
      description?: string;
      managerId: string;
    }>
  ) {
    try {
      const project = await Project.update(updateData, {
        where: { id },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id: string) {
    try {
      await Project.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectDAO();
