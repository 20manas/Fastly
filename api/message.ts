
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
  body('limit', 'Limit is required as a number').isInt({min: 10, max: 200}),
  body('offset', 'Offset is required as a number').isInt({min: 0}),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  if (!req.user) return res.status(404).send('You are not logged in.');
  const user = req.user as UserEssentials;

  const {friend, limit, offset} = req.body;
  const chat = await checkAndGetChat(user.username, friend, limit, offset);

  return res.json(chat);
});
