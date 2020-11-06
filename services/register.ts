import {User} from '../database/types/users';
import * as db from '../database/users';
const bcrypt = require('bcryptjs');

type UserRegistration = Pick<User,
  'username' | 'email' | 'name' | 'password'
>;

export const registerUser = async ({username, name, email, password}: UserRegistration) => {
  const hash: string = await bcrypt.hash(password, 10);

  await db.addUser({username, email, name, hashedPassword: hash});
};
