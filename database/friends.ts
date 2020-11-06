import * as db from '../loaders/database';
import {User} from './types/users';

/*
CREATE TABLE friends (
  id INTEGER NOT NULL REFERENCES users(id),
  friend_id INTEGER NOT NULL REFERENCES users(id),
  request_sent BOOLEAN,
  PRIMARY KEY(id, friend_id)
);
*/

// QUERIES

/**
 * Returns
 * - `undefined` if no request or connection exists
 * - `null` if the users are already friends
 * - `true` if senderId has sent a request to receiverId
 * - `false` false senderId has received a request from receiverId
 */

export const getFriendRequestStatus =
async (senderId: User['id'], receiverId: User['id']) => {
  const result = await db.query(
      'SELECT request_sent FROM friends WHERE id=$1 AND friend_id=$2',
      [senderId, receiverId],
  );
  if (result.rows.length == 0) return undefined;
  return result.rows[0].request_sent;
};

export const getSentRequests =
async (userId: User['id']) => {
  const result = await db.query(
      `SELECT username
      FROM users INNER JOIN (
        SELECT friend_id
        FROM friends WHERE id=$1 AND request_sent=TRUE
      ) AS sender ON users.id=sender.friend_id`,
      [userId],
  );
  return result.rows;
};

export const getReceivedRequests =
async (userId: User['id']) => {
  const result = await db.query(
      `SELECT username
      FROM users INNER JOIN (
        SELECT friend_id
        FROM friends WHERE id=$1 AND request_sent=FALSE
      ) AS receiver ON users.id=receiver.friend_id`,
      [userId],
  );
  return result.rows;
};

// INSERTIONS

export const addFriendRequest = async (senderId: User['id'], receiverId: User['id']) => {
  await db.query(
      'INSERT INTO friends VALUES ($1, $2, true)',
      [senderId, receiverId],
  );
  await db.query(
      'INSERT INTO friends VALUES ($1, $2, false)',
      [receiverId, senderId],
  );
  return true;
};

// UPDATING

export const addFriend = async (senderId: User['id'], receiverId: User['id']) => {
  await db.query(
      'UPDATE friends SET request_sent=null WHERE id=$1 AND friend_id=$2',
      [senderId, receiverId],
  );
  await db.query(
      'UPDATE friends SET request_sent=null WHERE id=$1 AND friend_id=$2',
      [receiverId, senderId],
  );
  return true;
};

// DELETIONS

export const removeFriend = async (senderId: User['id'], receiverId: User['id']) => {
  await db.query(
      'DELETE FROM friends WHERE id=$1 AND friend_id=$2',
      [senderId, receiverId],
  );
  await db.query(
      'DELETE FROM friends WHERE id=$1 AND friend_id=$2',
      [receiverId, senderId],
  );
  return true;
};
