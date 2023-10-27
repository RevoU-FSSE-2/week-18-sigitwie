import { Request, Response } from 'express';
import TaskAssignmentsDAO from '../dao/TaskAssignmentsDAO';

export async function createAssignment(req: Request, res: Response): Promise<Response> {
    try {
        const assignmentData = req.body;
        const assignment = await TaskAssignmentsDAO.createAssignment(assignmentData);
        return res.status(201).json(assignment);
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}

export async function getAssignmentById(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const assignment = await TaskAssignmentsDAO.getAssignmentById(id);
        if (assignment) {
            return res.status(200).json(assignment);
        } else {
            return res.status(404).json({ message: 'Assignment not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}

export async function updateAssignment(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const affectedCount = await TaskAssignmentsDAO.updateAssignment(id, updateData);

        if (affectedCount > 0) {  // number of affected rows
            return res.status(200).json({ message: 'Assignment updated successfully' });
        } else {
            return res.status(404).json({ message: 'Assignment not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}


export async function deleteAssignment(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        await TaskAssignmentsDAO.deleteAssignment(id);
        return res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}
