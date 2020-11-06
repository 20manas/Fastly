import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import next from 'next';

require('dotenv').config();

import './loaders/database';
import setLocalStrategy from './loaders/passport';

import routers from './loaders/routers';

const redisClient = require('redis').createClient();
const RedisStore = require('connect-redis')(session);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(
      session({
        store: new RedisStore({client: redisClient}),
        secret: process.env.SESSIONS_SECRET || '$%#%5j4iojro5387',
        resave: false,
        saveUninitialized: false,
      }),
  );

  setLocalStrategy(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  routers(app);

  app.all('*', (req, res) => {
    return nextHandle(req, res);
  });

  const port = process.env.PORT || 6942;
  app.listen(port, () => console.log(`Server started on ${port}`));
});
