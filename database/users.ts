import {User, UserEssentials} from './types/users';
import * as db from '../loaders/database';
import {QueryResult} from 'pg';

/*
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(320) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password CHAR(60) NOT NULL
);
*/

// QUERIES

export const getUserByUsername =
async (username: User['username']): Promise<null | UserEssentials> => {
  type Result = QueryResult<Omit<User, 'password'>>;
  const result: Result = await db.query(
      'SELECT id, username, name, email FROM users WHERE username=$1 LIMIT 1',
      [username],
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const getUserById =
async (id: User['id']): Promise<null | UserEssentials> => {
  type Result = QueryResult<Omit<User, 'password'>>;
  const result: Result = await db.query(
      'SELECT id, username, name, email FROM users WHERE id=$1',
      [id],
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const getPassword =
async (username: User['username']) => {
  type Result = QueryResult<Pick<User, 'id' | 'password'>>;
  const result: Result = await db.query(
      'SELECT id, password FROM users WHERE username=$1 LIMIT 1',
      [username],
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};

// INSERTIONS

type UserRegistration = Pick<User,
  'username' | 'email' | 'name'
> & {hashedPassword: User['password']};

export const addUser = async (user: UserRegistration) => {
  await db.query(
      'INSERT INTO users(username, email, name, password) VALUES($1, $2, $3, $4)', [
        user.username,
        user.email,
        user.name,
        user.hashedPassword,
      ],
  );
};
