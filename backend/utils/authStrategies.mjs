import passport from 'passport';
import { Strategy } from 'passport-local';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    done(null, { tem: 'test' });
  } catch (error) {}
});

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      console.log('int');
      done(null, { temp: 'temp' });
    } catch (error) {
      done(error, null);
    }
  })
);
