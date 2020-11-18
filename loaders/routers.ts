import {Express} from 'express';

import {registerRouter} from '../api/register';
import {loginRouter, logoutRouter} from '../api/authenticate';
import {userRouter} from '../api/user';
import {
  addFriendRouter,
  acceptFriendRouter,
  getReceivedRequestsRouter,
  getSentRequestsRouter,
  getFriendListRouter,
} from '../api/friend';

export default (app: Express) => {
  // register
  app.use('/register', registerRouter);

  // authenticate
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);

  // user
  app.use('/user', userRouter);

  // friend
  app.use('/addfriend', addFriendRouter);
  app.use('/acceptfriend', acceptFriendRouter);
  app.use('/getfriendrequests', getReceivedRequestsRouter);
  app.use('/getsentrequests', getSentRequestsRouter);
  app.use('/getfriends', getFriendListRouter);
};
