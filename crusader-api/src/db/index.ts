import { Client } from 'pg';

export const initDbAsync = async () => {
  const client = new Client();
  await client.connect();
  await client.end();
};
