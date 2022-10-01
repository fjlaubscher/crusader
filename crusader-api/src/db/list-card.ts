import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getListCardByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT list_card.*, list.name as list, crusade_card.name as crusade_card
    FROM list_card
    INNER JOIN list ON list_card.list_id = list.id
    INNER JOIN crusade_card ON list_card.crusade_card_id = crusade_card.id
    WHERE list_card.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Crusader.ListCard>(rows)[0];
};

export const getListCardsByListIdAsync = async (listId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT list_card.*
    FROM list_card
    WHERE list_card.list_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [listId]);
  await client.end();

  return mapFromPSQL<Crusader.ListCard>(rows);
};

export const createListCardAsync = async (input: Crusader.ListCard) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO list_card (
      list_id,
      crusade_card_id
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const { rows } = await client.query<TableRow>(query, [input.listId, input.crusadeCardId]);
  await client.end();

  return getListCardByIdAsync(rows[0].id as number);
};

export const deleteListCardAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM list_card WHERE id = $1', [id]);
  await client.end();

  return rowCount === 1;
};
