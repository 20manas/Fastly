import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
});

export default router;
