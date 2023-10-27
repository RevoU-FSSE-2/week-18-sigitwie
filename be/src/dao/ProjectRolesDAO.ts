import ProjectRoles from "../models/ProjectRoles";
import User from "../models/User";
import Project from "../models/Project";

class ProjectRolesDAO {
  async createProjectRole(roleData: {
    userId: string;
    projectId: string;
    role: string;
  }) {
    try {
      const role = await ProjectRoles.create(roleData);
      return role;
    } catch (error) {
      throw error;
    }
  }

  async getProjectRoleById(id: string) {
    try {
      const role = await ProjectRoles.findByPk(id, {
        include: [
          { model: User, as: "user" },
          { model: Project, as: "project" },
        ], // Include user and project data
      });
      return role;
    } catch (error) {
      throw error;
    }
  }

  async updateProjectRole(
    id: string,
    updateData: Partial<{ userId: string; projectId: string; role: string }>
  ) {
    try {
      const role = await ProjectRoles.update(updateData, {
        where: { id },
      });
      return role;
    } catch (error) {
      throw error;
    }
  }

  async deleteProjectRole(id: string) {
    try {
      await ProjectRoles.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectRolesDAO();
