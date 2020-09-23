import {Pool} from 'pg';

const pool = new Pool();
console.log('Pool created');

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
}

// interface PieceOfContent {
//   type: 'text' | 'image' | 'Post',
//   rawData: any,
// }

interface Post {
  id: number;
  date: Date;
  userId: number;
  content: string;
  upvoterIds: Set<number>;
}

const client = () => pool.connect();
const query = (text: string, params: any) => pool.query(text, params);

export {client, query};

export type {User, Post};
