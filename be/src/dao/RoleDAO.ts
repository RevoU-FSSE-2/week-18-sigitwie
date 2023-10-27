import Role from "../models/Role";

class RoleDAO {
  async createRole(roleData: { name: string }) {
    try {
      const role = await Role.create(roleData);
      return role;
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(id: string) {
    try {
      const role = await Role.findByPk(id);
      return role;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(id: string, updateData: Partial<{ name: string }>) {
    try {
      const role = await Role.update(updateData, {
        where: { id },
      });
      return role;
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(id: string) {
    try {
      await Role.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new RoleDAO();
