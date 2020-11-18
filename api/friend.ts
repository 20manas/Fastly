import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {UserEssentials} from '../database/types/users';
import {getUserByUsername} from '../database/users';
import {sendFriendRequest, acceptFriendRequest} from '../services/friend';
import {getReceivedRequests, getSentRequests, getFriendList} from '../database/friends';

export const addFriendRouter = Router();

addFriendRouter.put(
    '/',
    [
      body('username', 'Username is required.').notEmpty(),
      body('username', 'Username should be alphanumeric').custom(
          (username) => /^[A-Za-z][A-Za-z\d]*$/.test(username),
      ),
    ],
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
        if (!req.user) {
          return res.status(401).send('You must be logged in.');
        }
        const user = req.user as UserEssentials;
        const receiver = await getUserByUsername(req.body.username);
        if (!receiver) {
          return res.status(400).send('The user does not exist.');
        }
        if (sendFriendRequest(user.id, receiver.id)) {
          return res.status(204);
        } else {
          return res.status(400).send('Could not send friend request.');
        }
      } catch (err) {
        console.error(err);
        return res.status(500).send('There was some internal error.');
      }
    },
);

export const acceptFriendRouter = Router();

acceptFriendRouter.put(
    '/',
    [
      body('username', 'Username is required.').notEmpty(),
      body('username', 'Username should be alphanumeric').custom(
          (username) => /^[A-Za-z][A-Za-z\d]*$/.test(username),
      ),
    ],
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        if (!req.user) {
          return res.status(401).send('You must be logged in.');
        }
        const user = req.user as UserEssentials;
        const receiver = await getUserByUsername(req.body.username);
        if (!receiver) {
          return res.status(400).send('The user does not exist.');
        }
        if (acceptFriendRequest(user.id, receiver.id)) {
          return res.status(204);
        } else {
          return res.status(400).send('No friend request has been sent.');
        }
      } catch (err) {
        console.error(err);
        return res.status(500).send('There was some internal error.');
      }
    },
);

export const getReceivedRequestsRouter = Router();

getReceivedRequestsRouter.get(
    '/',
    async (req: Request, res: Response) => {
      if (!req.user) return res.status(401).send('You are not logged in.');

      const user = req.user as UserEssentials;

      const list = await getReceivedRequests(user.id);
      res.json(list);
    },
);

export const getSentRequestsRouter = Router();

getSentRequestsRouter.get(
    '/',
    async (req: Request, res: Response) => {
      if (!req.user) return res.status(401).send('You are not logged in.');

      const user = req.user as UserEssentials;

      const list = await getSentRequests(user.id);
      res.json(list);
    },
);

export const getFriendListRouter = Router();

getFriendListRouter.get(
    '/',
    async (req: Request, res: Response) => {
      if (!req.user) return res.status(401).send('You are not logged in.');
      const user = req.user as UserEssentials;

      const list = await getFriendList(user.id);
      res.json(list);
    },
);
