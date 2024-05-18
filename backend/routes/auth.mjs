import { Router } from 'express';
import passport from 'passport';
import '../utils/authStrategies.mjs';

const router = Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  return res.statusCode(200).json({ msg: 'auth done' });
});

export default router;
