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

  return mapFromPSQL<Crusader.Player>(rows)[0];
};

export const getPlayerByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * FROM player WHERE id = $1', [id]);
  await client.end();

  return mapFromPSQL<Crusader.Player>(rows)[0];
};

export const getPlayersAsync = async (name?: string) => {
  const client = new Client();
  await client.connect();

  const query = name ? `%${name}%` : '%%';
  const { rows } = await client.query<TableRow>('SELECT * FROM player WHERE name LIKE $1', [query]);
  await client.end();

  return mapFromPSQL<Crusader.Player>(rows);
};

export const updatePlayerAsync = async (input: Crusader.Player) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE player
    SET name = $1,
        notes = $2,
        avatar = $3
    WHERE id = $4
  `;
  await client.query<TableRow>(query, [input.name, input.notes, input.avatar, input.id]);
  await client.end();

  return getPlayerByIdAsync(input.id);
};
