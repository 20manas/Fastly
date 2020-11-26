import {QueryResult} from 'pg';
import * as db from '../loaders/database';
import {User} from './types/users';

/*
CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  receiver_id INTEGER NOT NULL REFERENCES users(id),
  content VARCHAR(512),
  sent_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
*/

export const getChat = async (
    userId1: User['id'], userId2: User['id'], limit: number,
) => {
  interface Result {
    sender_id: number;
    receiver_id: number;
    content: string;
    sent_at: Date;
  }
  const result: QueryResult<Result> = await db.query(
      `SELECT sender_id, receiver_id, content, sent_at
      FROM messages
      WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)`,
      [userId1, userId2],
  );
  return result.rows;
};

export const addMessage = async (
    senderId: User['id'],
    receiverId: User['id'],
    content: string,
    date: Date,
) => {
  await db.query(
      `INSERT INTO messages (sender_id, receiver_id, content, sent_at)
      VALUES ($1, $2, $3, $4)`,
      [senderId, receiverId, content, date],
  );
  return true;
};
