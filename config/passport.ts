import {PassportStatic} from 'passport';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

import * as db from '../utils/database';

export default (passport: PassportStatic): void => {
  passport.use(new LocalStrategy(
      async (username: string, password: string, done: any) => {
        try {
          const result = await db.query(
              'SELECT * FROM users WHERE username=$1 LIMIT 1',
              [username],
          );
          const user = result.rows[0];
          if (!user) {
            return done(null, false, {message: 'The username does not exist!'});
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Wrong password!'});
          }
        } catch (err) {
          console.error(err);
          return done(null, false, {message: 'Error!'});
        }
      },
  ));

  passport.serializeUser((user: db.User, done) => done(null, user.id));

  passport.deserializeUser((id: number, done) =>
    db
        .query(
            'SELECT * FROM users WHERE id=$1 LIMIT 1',
            [id],
        )
        .then(
            (result) => done(null, result.rows[0]),
        )
        .catch((err) => done(err, null)),
  );
};
