import express from "express";
import UserRoutes from "./routes/UserRoutes";
import ProjectRoutes from "./routes/ProjectRoutes";
import ProjectRoleRoutes from "./routes/ProjectRolesRoutes";
import TaskRoutes from "./routes/TaskRoutes";
import TaskAssignmentRoutes from "./routes/TaskAssignmentsRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import cookieParser from "cookie-parser";
import authenticationMiddleware from "./middlewares/AuthenticationMiddleware";
import {
  corsMiddleware,
  helmetMiddleware,
  frameguardMiddleware,
} from "./middlewares/CorsMiddleware";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";
import fs from "fs";
import path from "path";

const app = express();

app.use(helmetMiddleware);
app.use(frameguardMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

const openApiPath = path.join(__dirname, "..", "doc", "openapi.yaml");
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = yaml.parse(file);


app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/api/users", UserRoutes);
app.use("/v1/api/projects", authenticationMiddleware, ProjectRoutes);
app.use("/v1/api/project-roles", authenticationMiddleware, ProjectRoleRoutes);
app.use("/v1/api/tasks", authenticationMiddleware, TaskRoutes);
app.use("/v1/api/task-assignments", authenticationMiddleware, TaskAssignmentRoutes);
app.use("/v1/api/comments", authenticationMiddleware, CommentRoutes);

export default app;
