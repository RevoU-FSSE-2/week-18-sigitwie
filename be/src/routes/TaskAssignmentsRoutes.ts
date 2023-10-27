import { Router } from 'express';
import {
    createAssignment,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} from '../controllers/TaskAssignmentsController';

const TaskAssignmentRoutes = Router();

TaskAssignmentRoutes.post('/add', createAssignment);
TaskAssignmentRoutes.get('/:id', getAssignmentById);
TaskAssignmentRoutes.put('/update/:id', updateAssignment);
TaskAssignmentRoutes.delete('/delete/:id', deleteAssignment);

export default TaskAssignmentRoutes;