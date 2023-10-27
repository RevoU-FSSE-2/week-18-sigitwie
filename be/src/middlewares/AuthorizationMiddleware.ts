import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Project from '../models/Project';
import Task from '../models/Task';
import Comment from '../models/Comment';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const SECRET_KEY: string = process.env.JWT_SECRET;

interface ExtendedRequest extends Request {
    user?: {
        userId: string;
        username: string;
    };
}

const authorizationMiddleware = (resourceType: string) => {
    return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        const token = req.cookies.auth_token; // Extract the token from cookies

        if (!token) {
            return res.status(403).json({ message: 'Access forbidden. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY) as any; 
            req.user = {
                userId: decoded.userId,
                username: decoded.username
            };
        } catch (error) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        const { userId } = req.user!;

        switch (resourceType) {
            case 'project':
                if (req.method === 'GET') {
                    const project = await Project.findByPk(req.params.id);
                    // console.log(`[DEBUG] ${req.method} request to ${req.originalUrl}`);
                    // console.log("[DEBUG] Parameters received:", req.params);
                    if (!project) {
                        return res.status(404).json({ message: 'Project not found.' });
                    }
                    if (project.managerId === userId) {
                        return next(); // user is the manager for this project
                    }
                }
                break;
                
            case 'edit-project':
                if (req.method === 'PUT') {
                    const projectToEdit = await Project.findByPk(req.params.id);
                    if (!projectToEdit) {
                        return res.status(404).json({ message: 'Project not found.' });
                    }
                    if (projectToEdit.managerId === userId) {
                        return next(); // User is the manager for this project and can edit it
                    } else {
                        return res.status(403).json({ message: 'Only the project manager can edit this project.' });
                    }
                }
                break;

                case 'delete-project':
                    if (req.method === 'DELETE') {
                        const projectToDelete = await Project.findByPk(req.params.id);
                        if (!projectToDelete) {
                            return res.status(404).json({ message: 'Project not found.' });
                        }
                        if (projectToDelete.managerId === userId) {
                            return next(); // User is the manager for this project and can delete it
                        } else {
                            return res.status(403).json({ message: 'Only the project manager can delete this project.' });
                        }
                    }
                    break;
                

            case 'add-task':
                if (req.method === 'POST') {
                    const projectId = req.body.projectId;
                    const project = await Project.findByPk(projectId);
                    if (!project) {
                        return res.status(404).json({ message: 'Project not found.' });
                    }
                    if (project.managerId === userId) {
                        return next(); // user is the manager for this project and is authorized to add tasks
                    } else {
                        return res.status(403).json({ message: 'Only the project manager can add tasks.' });
                    }
                }
                break;

            case 'task':
                const task = await Task.findByPk(req.params.id);
                // console.log(`[DEBUG] ${req.method} request to ${req.originalUrl}`);
                // console.log("[DEBUG] Parameters received:", req.params);
                if (!task) {
                    return res.status(404).json({ message: 'Task not found.' });
                }
                if (task.assignedTo === userId) {
                    return next(); // user is the assigned team member for this task
                }
                const relatedProjectForTask = await Project.findByPk(task.projectId);
                if (relatedProjectForTask?.managerId === userId) {
                    return next(); // user is the manager for the project related to this task
                }
                break;

                case 'comment':
                const comment = await Comment.findByPk(req.params.id);
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found.' });
                }
                const taskForComment = await Task.findByPk(comment.taskId);
                if (!taskForComment) {
                    return res.status(404).json({ message: 'Task for the comment not found.' });
                }
                if (taskForComment.assignedTo === userId) {
                    return next(); // user is the assigned team member for this task
                }
                const relatedProjectForComment = await Project.findByPk(taskForComment.projectId);
                if (relatedProjectForComment?.managerId === userId) {
                    return next(); // user is the manager for the project related to this comment
                }
                break;

                case 'add-comment':
                if (req.method === 'POST') {
                    const { taskId } = req.body;

                    // Ambil task berdasarkan taskId
                    const taskForAddComment = await Task.findByPk(taskId);
                    if (!taskForAddComment) {
                        return res.status(404).json({ message: 'Task not found.' });
                    }

                    // Ambil proyek yang terkait dengan task
                    const relatedProjectForAddComment = await Project.findByPk(taskForAddComment.projectId);
                    if (!relatedProjectForAddComment) {
                        return res.status(404).json({ message: 'Related project not found.' });
                    }

                    // Cek apakah pengguna adalah manajer proyek atau asignee task
                    if (relatedProjectForAddComment.managerId === userId || taskForAddComment.assignedTo === userId) {
                        return next(); // User is either the manager or the assignee and can add a comment
                    }

                    return res.status(403).json({ message: 'Access forbidden. Only managers and assignees can add comments.' });
                }
                break;

                case 'project-role':
                // Retrieve the projectId from the request body
                const { projectId } = req.body;

                // Fetch the project using the projectId
                const project = await Project.findByPk(projectId);
                
                if (!project) {
                    return res.status(404).json({ message: 'Project not found.' });
                }

                // Check if the current user is the manager of the project
                if (project.managerId === userId) {
                    return next(); // User is the manager for this project and can manage roles
                }

                return res.status(403).json({ message: 'Access forbidden. Only managers can manage project roles.' });

                


            default:
                return res.status(403).json({ message: 'Access forbidden. Invalid resource type.' });
        }

        return res.status(403).json({ message: 'Access forbidden. User not authorized for this action.' });
    };
};

export default authorizationMiddleware;
