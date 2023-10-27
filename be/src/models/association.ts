import sequelize from "../services/db";
import Role from "../models/Role";
import User from "../models/User";
import Task from "../models/Task";
import Comment from "../models/Comment";
import Project from "../models/Project";
import ProjectRoles from "../models/ProjectRoles";
import TaskAssignment from "../models/TaskAssignment";

// Define associations
export const setupAssociations = () => {
  User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

  Project.belongsTo(User, {
    as: "manager",
    foreignKey: "managerId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  Project.hasMany(Task, {
    foreignKey: "projectId",
    as: "tasks",
    onDelete: "CASCADE",
  });

  ProjectRoles.belongsTo(User, { foreignKey: "userId", as: "user" });
  ProjectRoles.belongsTo(Project, { foreignKey: "projectId", as: "project" });

  Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });
  Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });
  Task.hasMany(Comment, { foreignKey: "taskId", as: "comments" });

  TaskAssignment.belongsTo(User, { foreignKey: "userId", as: "user" });
  TaskAssignment.belongsTo(Task, { foreignKey: "taskId", as: "task" });

  Comment.belongsTo(User, { foreignKey: "userId", as: "commenter" });
  Comment.belongsTo(Task, { foreignKey: "taskId", as: "task" });
};

// Add the afterDefine hook to set up associations automatically
sequelize.addHook("afterDefine", (models) => {
  setupAssociations();
});
