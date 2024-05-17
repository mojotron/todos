import { Router } from 'express';
import authRouter from './auth.mjs';
import taskRoutes from './tasks.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'hello world' });
});

router.use('/api/auth', authRouter);
router.use('/api/tasks', taskRoutes);

export default router;