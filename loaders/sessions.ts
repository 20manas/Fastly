import session from 'express-session';
import {Express} from 'express';

const redisClient = require('redis').createClient();
const RedisStore = require('connect-redis')(session);

export default (app: Express) => {
  app.use(
      session({
        store: new RedisStore({client: redisClient}),
        secret: process.env.SESSIONS_SECRET || '$%#%5j4iojro5387',
        resave: false,
        saveUninitialized: false,
      }),
  );
};
