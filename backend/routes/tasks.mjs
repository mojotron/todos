import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasksController.mjs';

const router = Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:taskID').get(getTask).patch(updateTask).delete(deleteTask);

export default router;
