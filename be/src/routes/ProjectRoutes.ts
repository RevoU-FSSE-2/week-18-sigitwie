import express from "express";
import {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getAllProjects,
} from "../controllers/ProjectController";
import authorizationMiddleware from "../middlewares/AuthorizationMiddleware";

const ProjectRoutes = express.Router();

ProjectRoutes.post("/add", createProject);
ProjectRoutes.get("/all-projects", getAllProjects);
ProjectRoutes.get("/:id", authorizationMiddleware("project"), getProjectById);
ProjectRoutes.put(
  "/update/:id",
  authorizationMiddleware("edit-project"),
  updateProject
);
ProjectRoutes.delete(
  "/delete/:id",
  authorizationMiddleware("delete-project"),
  deleteProject
);

export default ProjectRoutes;
