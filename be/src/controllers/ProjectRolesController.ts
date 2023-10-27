import ProjectRolesDAO from '../dao/ProjectRolesDAO';
import { Request, Response } from 'express';

// Create a new project role
export const createProjectRole = async (req: Request, res: Response) => {
    try {
        const { userId, projectId, role } = req.body;
        const projectRole = await ProjectRolesDAO.createProjectRole({ userId, projectId, role });
        res.status(201).json(projectRole);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

// Get a project role by ID
export const getProjectRoleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const projectRole = await ProjectRolesDAO.getProjectRoleById(id);
        if (projectRole) {
            res.status(200).json(projectRole);
        } else {
            res.status(404).json({ message: 'Project role not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

// Update a project role
export const updateProjectRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const [updatedCount] = await ProjectRolesDAO.updateProjectRole(id, updateData);
        if (updatedCount > 0) {
            res.status(200).json({ message: 'Project role updated successfully' });
        } else {
            res.status(404).json({ message: 'Project role not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

// Delete a project role
export const deleteProjectRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await ProjectRolesDAO.deleteProjectRole(id);
        res.status(200).json({ message: 'Project role deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
