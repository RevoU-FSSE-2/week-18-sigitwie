import express from 'express';
import {
    createProjectRole,
    getProjectRoleById,
    updateProjectRole,
    deleteProjectRole
} from '../controllers/ProjectRolesController';
import authorizationMiddleware from '../middlewares/AuthorizationMiddleware';


const ProjectRoleRoutes = express.Router();
ProjectRoleRoutes.post('/add', authorizationMiddleware('project-role'), createProjectRole);
ProjectRoleRoutes.get('/:id', authorizationMiddleware('project-role'), getProjectRoleById);
ProjectRoleRoutes.put('/update/:id', authorizationMiddleware('project-role'), updateProjectRole);
ProjectRoleRoutes.delete('/delete/:id', authorizationMiddleware('project-role'), deleteProjectRole);

export default ProjectRoleRoutes;
