import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const createPlayerAsync = async (name: string) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'INSERT INTO player (name) VALUES ($1) RETURNING *',
    [name]
  );
  await client.end();

  return mapFromPSQL<Crusader.ListItem>(rows)[0];
};

export const getPlayerByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * FROM player WHERE id = $1', [id]);
  await client.end();

  return mapFromPSQL<Crusader.ListItem>(rows)[0];
};

export const getPlayersAsync = async (name?: string) => {
  const client = new Client();
  await client.connect();

  const query = name ? `%${name}%` : '%%';
  const { rows } = await client.query<TableRow>('SELECT * FROM player WHERE name LIKE $1', [query]);
  await client.end();

  return mapFromPSQL<Crusader.ListItem>(rows);
};

export const updatePlayerAsync = async (input: Crusader.ListItem) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'UPDATE player SET name = $1 WHERE id = $2 RETURNING *',
    [input.name, input.id]
  );
  await client.end();

  return mapFromPSQL<Crusader.ListItem>(rows)[0];
};
