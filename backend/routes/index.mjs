import { Router } from 'express';
import taskRoutes from './tasks.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'hello world' });
});

router.use('/api/tasks', taskRoutes);

export default router;
