import {Router} from 'express';
import passport from 'passport';

import genPage from '../utils/base';
import loginView from '../views/login';

const router = Router();

router.get('/', (req, res) => {
  res.send(genPage({user: req.user}, loginView));
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
});

export {router};
