import {Pool} from 'pg';

const pool = new Pool();
console.log('Pool created');

export const client = () => pool.connect();
export const query = (text: string, params: any) => pool.query(text, params);
