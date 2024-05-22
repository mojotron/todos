import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user.mjs';
import { comparePassword } from '../utils/helpers.mjs';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    if (user === null) throw new Error('unknown user');
    done(null, { username: user.username, id: user._id });
  } catch (error) {}
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username }).exec();
      if (user === null) throw new Error('unknown username');
      const validPassword = await comparePassword(password, user.password);
      if (validPassword === false) throw new Error('invalid password');
      done(null, { username: user.username, id: user._id });
    } catch (error) {
      done(error, null);
    }
  })
);
