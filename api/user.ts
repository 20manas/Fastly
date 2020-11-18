import {Router} from 'express';
import {UserEssentials} from '../database/types/users';

export const userRouter = Router();

userRouter.get('/', (req, res) => {
  if (!req.user) return res.status(404).send('You are not logged in.');
  const user = req.user as UserEssentials;
  return res.json({username: user.username, name: user.name});
});
