
import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {UserEssentials} from '../database/types/users';
import {checkAndGetChat} from '../services/messages';

export const getChatRouter = Router();

getChatRouter.post('/', [
  body('friend', 'Friend username is required').notEmpty(),
  body('friend', 'Username should be alphanumeric').custom(
      (friend) => /^[A-Za-z][A-Za-z\d]*$/.test(friend),
  ),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  if (!req.user) return res.status(404).send('You are not logged in.');
  const user = req.user as UserEssentials;

  const chat = await checkAndGetChat(user.username, req.body.friend);

  return res.json(chat);
});
