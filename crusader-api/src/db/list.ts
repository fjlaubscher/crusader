import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getListByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT list.*, order_of_battle.name as order_of_battle, order_of_battle.player_id, player.name as player
    FROM list
    INNER JOIN order_of_battle ON list.order_of_battle_id = order_of_battle.id
    INNER JOIN player ON order_of_battle.player_id = player.id
    WHERE list.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Crusader.List>(rows)[0];
};

export const createListAsync = async (input: Crusader.List) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO list (
      order_of_battle_id,
      size,
      name,
      notes
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const { rows } = await client.query<TableRow>(query, [
    input.orderOfBattleId,
    input.size,
    input.name,
    input.notes
  ]);
  await client.end();

  return getListByIdAsync(rows[0].id as number);
};

export const getListsByPlayerIdAsync = async (playerId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT list.*, order_of_battle.name as order_of_battle, order_of_battle.player_id, player.name as player
    FROM list
    INNER JOIN order_of_battle ON list.order_of_battle_id = order_of_battle.id
    INNER JOIN player ON order_of_battle.player_id = player.id
    WHERE player.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [playerId]);
  await client.end();

  return mapFromPSQL<Crusader.List>(rows);
};

export const getListsByOrderOfBattleIdAsync = async (orderOfBattleId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT list.*, order_of_battle.name as order_of_battle, order_of_battle.player_id, player.name as player
    FROM list
    INNER JOIN order_of_battle ON list.order_of_battle_id = order_of_battle.id
    INNER JOIN player ON order_of_battle.player_id = player.id
    WHERE list.order_of_battle_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [orderOfBattleId]);
  await client.end();

  return mapFromPSQL<Crusader.Battle>(rows);
};

export const updateListAsync = async (input: Crusader.List) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE list
    SET order_of_battle_id = $1,
        size = $2,
        name = $3,
        notes = $4
    WHERE id = $5
  `;
  await client.query<TableRow>(query, [
    input.orderOfBattleId,
    input.size,
    input.name,
    input.notes,
    input.id
  ]);
  await client.end();

  return getListByIdAsync(input.id);
};

export const deleteListAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM list WHERE id = $1', [id]);
  await client.end();

  return rowCount === 1;
};
