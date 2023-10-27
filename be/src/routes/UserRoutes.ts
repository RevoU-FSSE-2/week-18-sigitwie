import { Router } from "express";
import {
  register,
  login,
  logout,
  getUserById,
  getAllUsers,
  deleteUser,
} from "../controllers/UserController";
import sequelize from "../services/db";
import UserDAO from "../dao/UserDAO";
import authenticationMiddleware from "../middlewares/AuthenticationMiddleware";

const userDAO = new UserDAO(sequelize);

const UserRouter = Router();

// Public routes (no authentication required)
UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.post("/logout", logout);

// Protected routes (authentication required)
UserRouter.get("/:id", authenticationMiddleware, getUserById);
UserRouter.get("/users", authenticationMiddleware, getAllUsers);
UserRouter.delete("/:id", authenticationMiddleware, deleteUser);

export default UserRouter;
