import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getBattleStatusesAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from battle_status');
  await client.end();

  return mapFromPSQL<Crusader.ListItem>(rows);
};
