import { Router } from "express";
import {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasksForUser,
} from "../controllers/TaskController";
import authorizationMiddleware from "../middlewares/AuthorizationMiddleware";

const TaskRoutes = Router();

TaskRoutes.post("/add", authorizationMiddleware ("add-task"), createTask);
TaskRoutes.get("/all-tasks", getAllTasksForUser);
TaskRoutes.get("/:id", authorizationMiddleware("task"), getTaskById);
TaskRoutes.put("/update/:id", authorizationMiddleware("task"), updateTask);
TaskRoutes.delete("/delete/:id", authorizationMiddleware("task"), deleteTask);

export default TaskRoutes;
