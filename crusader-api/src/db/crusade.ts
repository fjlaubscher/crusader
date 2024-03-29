import { Client } from 'pg';
import { parseISO } from 'date-fns';
import { mapFromPSQL } from '../helpers';

export const getCrusadeByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT crusade.*, player.name as created_by
    FROM crusade
    INNER JOIN player ON crusade.created_by_id = player.id
    WHERE crusade.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Crusader.Crusade>(rows)[0];
};

export const createCrusadeAsync = async (input: Crusader.Crusade) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'INSERT INTO crusade (name, created_date, created_by_id, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [input.name, parseISO(input.createdDate), input.createdById, input.notes, input.avatar]
  );
  await client.end();

  return getCrusadeByIdAsync(rows[0].id as number);
};

export const getCrusadesByPlayerIdAsync = async (playerId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT crusade.*, player.name as created_by
    FROM crusade
    LEFT OUTER JOIN order_of_battle ON order_of_battle.crusade_id = crusade.id
    INNER JOIN player ON crusade.created_by_id = player.id
    WHERE order_of_battle.player_id = $1 OR crusade.created_by_id = $1
    GROUP BY crusade.id, player.id
  `;
  const { rows } = await client.query<TableRow>(query, [playerId]);
  await client.end();

  return mapFromPSQL<Crusader.Crusade>(rows);
};

export const updateCrusadeAsync = async (input: Crusader.Crusade) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE crusade
    SET name = $1, notes = $2, avatar = $3
    WHERE id = $4
  `;
  await client.query<TableRow>(query, [input.name, input.notes, input.avatar, input.id]);
  await client.end();

  return getCrusadeByIdAsync(input.id);
};

export const deleteCrusadeAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM crusade WHERE id = $1', [id]);
  await client.end();

  return rowCount === 1;
};
