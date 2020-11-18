import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import next from 'next';

require('dotenv').config();

import './loaders/database';
import session from './loaders/sessions';
import setLocalStrategy from './loaders/passport';

import webSocketStart from './loaders/ws';

import routers from './loaders/routers';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  session(app);

  setLocalStrategy(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  routers(app);

  webSocketStart(app);

  app.all('*', (req, res) => {
    return nextHandle(req, res);
  });

  const port = process.env.PORT || 6942;
  app.listen(port, () => console.log(`Server started on ${port}`));
});
