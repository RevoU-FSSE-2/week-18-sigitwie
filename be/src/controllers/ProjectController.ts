import { Request, Response } from 'express';
import ProjectDAO from '../dao/ProjectDAO';

export interface ExtendedRequest extends Request {
    user?: {
        userId: string;
        username: string;
        roleId: string;
    };
}

export async function createProject(req: Request, res: Response): Promise<Response> {
    try {
        const { name, description, managerId } = req.body;
        const project = await ProjectDAO.createProject({ name, description, managerId });
        return res.status(201).json(project);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
    
}

export async function getProjectById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const project = await ProjectDAO.getProjectById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(project);
    }catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
    
}

export async function updateProject(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { name, description, managerId } = req.body;

        await ProjectDAO.updateProject(id, { name, description, managerId });
        return res.status(200).json({ message: 'Project updated successfully' });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
    
}

export async function deleteProject(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        await ProjectDAO.deleteProject(id);
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
}


export async function getAllProjects(req: ExtendedRequest, res: Response): Promise<Response> {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(403).json({ message: 'Authentication failed. User ID is missing.' });
        }

        const userId = req.user.userId;
        const projects = await ProjectDAO.getAllProjectsForUser(userId);

        return res.status(200).json(projects);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
}

