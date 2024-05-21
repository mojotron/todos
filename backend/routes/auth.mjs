import { Router } from 'express';
import passport from 'passport';
import '../utils/authStrategies.mjs';

const router = Router();

router.post('/', (req, res) => {
  return res.status(200).json({ msg: 'auth done' });
});

export default router;
