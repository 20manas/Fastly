import {Router, Response, Request} from 'express';
import {body, validationResult} from 'express-validator';

const bcrypt = require('bcryptjs');

import * as db from '../utils/database';
import genPage from '../utils/base';
import registerView from '../views/register';

const router = Router();

router.get('/', (req, res) => {
  res.send(genPage({user: req.user}, registerView));
});

router.post('/', [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Email is required').notEmpty(),
  body('email', 'Email is not valid').isEmail(),
  body('username', 'Username is required').notEmpty(),
  body('password', 'Password is required').notEmpty(),
  body('password2', 'Passwords do not match')
      .custom((pass2, {req}) => pass2 === req.body.password),
  body('email').normalizeEmail(),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    await db.query(
        'INSERT INTO users VALUES($1, $2, $3, $4)',
        [req.body.username, req.body.email, req.body.name, hash],
    );

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    return res.status(400).send('Error Occurred!');
  }
});

export {router};
