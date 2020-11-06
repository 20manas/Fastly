import {Router} from 'express';
import passport from 'passport';

export const loginRouter = Router();

loginRouter.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
});

export const logoutRouter = Router();

logoutRouter.get('/', (req, res) => {
  req.logout();
  res.redirect('/login');
});
