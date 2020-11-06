import {PassportStatic} from 'passport';
import * as db from '../database/users';
import {User, UserEssentials} from '../database/types/users';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

export default (passport: PassportStatic): void => {
  passport.use(new LocalStrategy(
      async (username: User['username'], password: User['password'], done: any) => {
        try {
          const user = await db.getPassword(username);
          if (user == null) {
            return done(null, false, {message: 'The username does not exist!'});
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, await db.getUserById(user.id));
          } else {
            return done(null, false, {message: 'Wrong password!'});
          }
        } catch (err) {
          console.error(err);
          return done(null, false, {message: 'Error!'});
        }
      },
  ));

  passport.serializeUser((user: UserEssentials, done) => done(null, user.id));

  passport.deserializeUser((id: UserEssentials['id'], done) =>
    db
        .getUserById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null)),
  );
};
