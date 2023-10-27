import User from "../models/User";
import { Sequelize } from "sequelize";

class UserDAO {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async createUser(userData: {
    username: string;
    password: string;
    email: string;
    roleId: string;
  }) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async userExists(userId: string): Promise<boolean> {
    try {
      const user = await User.findByPk(userId);
      return !!user;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async isOwner(userId: string, loggedInUserId: string): Promise<boolean> {
    return userId === loggedInUserId;
  }

  async getById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async getByUsername(username: string): Promise<User | null> {
    return await User.findOne({ where: { username } });
  }

  async deleteById(id: string): Promise<void> {
    await User.destroy({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  async updateUser(
    id: string,
    userData: {
      username?: string;
      password?: string;
      roleId?: string;
    }
  ): Promise<User | null> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        console.log("User not found with ID:", id);
        return null;
      }

      const updatedUser = await user.update(userData);

      if (!updatedUser) {
        console.log("Failed to update user with ID:", id);
        return null;
      }

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

export default UserDAO;
