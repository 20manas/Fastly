import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

require('dotenv').config();

const redisClient = require('redis').createClient();
const RedisStore = require('connect-redis')(session);

const app = express();

import './utils/database';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: process.env.SESSIONS_SECRET || '$%#%5j4iojro5387',
  resave: false,
  saveUninitialized: false,
}));

import setLocalStrategy from './config/passport';
setLocalStrategy(passport);

app.use(passport.initialize());
app.use(passport.session());

import genPage from './utils/base';
import indexView from './views/index';

import {router as registerRouter} from './routes/register';
import {router as loginRouter} from './routes/login';
import {router as logoutRouter} from './routes/logout';

app.get('/', (req, res) => res.send(genPage({user: req.user}, indexView)));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

const port = process.env.PORT || 6942;
app.listen(port, () => console.log(`Server started on ${port}`));
