import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectsController.mjs';

const router = Router();

router.route('/').get(getProjects).post(createProject);
router
  .route('/:projectID')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

export default router;
