import { Router } from 'express';
import passport from 'passport';
import User from '../models/user.mjs';
import { hashPassword } from '../utils/helpers.mjs';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/auth/success',
    failureRedirect: '/api/auth/fail',
  }),
  (req, res) => {
    return res.status(200).json({ msg: 'auth done' });
  }
);

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, password: hashedPassword });
    const userDoc = await newUser.save();

    if (!userDoc) throw new Error('Could not create new user');
    res.status(201).redirect('/api/auth/login');
  } catch (error) {
    next(error);
  }
});

router.get('/success', (req, res) => {
  res.send('auth success');
});

router.get('/protected', (req, res) => {});

router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) next(err);
      return res.redirect('/login');
    });
  } else {
  }
});

export default router;
