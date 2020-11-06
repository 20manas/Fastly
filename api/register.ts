import {Router, Response, Request} from 'express';
import {body, validationResult} from 'express-validator';

import {registerUser} from '../services/register';

const router = Router();

router.post(
    '/',
    [
      body('name', 'Name is required').notEmpty(),
      body('name', 'Name should have only English characters.').custom(
          (name) => /^[A-Za-z]+( [A-Za-z]+)*$/.test(name),
      ),
      body('email', 'Email is required').notEmpty(),
      body('email', 'Email is not valid').isEmail(),
      body('username', 'Username is required').notEmpty(),
      body('username', 'Username should be alphanumeric').custom(
          (username) => /^[A-Za-z][A-Za-z\d]*$/.test(username),
      ),
      body('password', 'Password is required').notEmpty(),
      body('password', 'Password has invalid characters').custom(
          (password) => /^[A-Za-z\d@$!%*?&]+$/.test(password),
      ),
      body('password2', 'Passwords do not match').custom(
          (pass2, {req}) => pass2 === req.body.password,
      ),
      body('email').normalizeEmail(),
    ],
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        await registerUser(req.body);

        res.redirect('/login');
      } catch (err) {
        console.error(err);
        return res.status(400).send('Error Occurred!');
      }
    },
);

export default router;
