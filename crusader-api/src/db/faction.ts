import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getFactionsAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from faction');
  await client.end();

  return mapFromPSQL<Crusader.ListItem>(rows);
};
