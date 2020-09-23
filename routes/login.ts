import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.post('/', (req, res, next) => {
  console.log('trying to log in');
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
});

export default router;
