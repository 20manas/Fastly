import {Pool} from 'pg';

const pool = new Pool();
console.log('Pool created');

interface User {
  id: number,
  username: string
  name: string,
  email: string,
  password: string,
}

const client = () => pool.connect();
const query = (text: string, params: any) => pool.query(text, params);

export {client, query, User};
