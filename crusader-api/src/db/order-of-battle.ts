import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getOrderOfBattleByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT 
      order_of_battle.*, 
      COALESCE(SUM(crusade_card.crusade_points)::integer, 0) as crusade_points,
      COALESCE(SUM(crusade_card.power_rating)::integer, 0) as supply_used,
      crusade.name as crusade,
      faction.name as faction,
      player.name as player
    FROM order_of_battle
    INNER JOIN crusade ON order_of_battle.crusade_id = crusade.id
    INNER JOIN faction ON order_of_battle.faction_id = faction.id
    INNER JOIN player ON order_of_battle.player_id = player.id
    LEFT OUTER JOIN crusade_card ON order_of_battle.id = crusade_card.order_of_battle_id
    WHERE order_of_battle.id = $1
    GROUP BY order_of_battle.id, crusade.name, faction.name, player.name
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Crusader.OrderOfBattle>(rows)[0];
};

export const createOrderOfBattleAsync = async (input: Crusader.OrderOfBattle) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO order_of_battle (battles, battles_won, crusade_id, faction_id, name, notes, player_id, requisition, supply_limit)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  const { rows } = await client.query<TableRow>(query, [
    input.battles,
    input.battlesWon,
    input.crusadeId,
    input.factionId,
    input.name,
    input.notes,
    input.playerId,
    input.requisition,
    input.supplyLimit
  ]);
  await client.end();

  return getOrderOfBattleByIdAsync(rows[0].id as number);
};

export const deleteOrderOfBattleAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM order_of_battle WHERE id = $1', [
    id
  ]);
  await client.end();

  return rowCount === 1;
};

export const getOrdersOfBattleByCrusadeIdAsync = async (crusadeId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT 
      order_of_battle.*, 
      COALESCE(SUM(crusade_card.crusade_points)::integer, 0) as crusade_points,
      COALESCE(SUM(crusade_card.power_rating)::integer, 0) as supply_used,
      crusade.name as crusade,
      faction.name as faction,
      player.name as player
    FROM order_of_battle
    INNER JOIN crusade ON order_of_battle.crusade_id = crusade.id
    INNER JOIN faction ON order_of_battle.faction_id = faction.id
    INNER JOIN player ON order_of_battle.player_id = player.id
    LEFT OUTER JOIN crusade_card ON order_of_battle.id = crusade_card.order_of_battle_id
    WHERE order_of_battle.crusade_id = $1
    GROUP BY order_of_battle.id, crusade.name, faction.name, player.name
  `;
  const { rows } = await client.query<TableRow>(query, [crusadeId]);
  await client.end();

  return mapFromPSQL<Crusader.OrderOfBattle>(rows);
};

export const getOrdersOfBattleByPlayerIdAsync = async (playerId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT 
      order_of_battle.*, 
      COALESCE(SUM(crusade_card.crusade_points)::integer, 0) as crusade_points,
      COALESCE(SUM(crusade_card.power_rating)::integer, 0) as supply_used,
      crusade.name as crusade,
      faction.name as faction,
      player.name as player
    FROM order_of_battle
    INNER JOIN crusade ON order_of_battle.crusade_id = crusade.id
    INNER JOIN faction ON order_of_battle.faction_id = faction.id
    INNER JOIN player ON order_of_battle.player_id = player.id
    LEFT OUTER JOIN crusade_card ON order_of_battle.id = crusade_card.order_of_battle_id
    WHERE order_of_battle.player_id = $1
    GROUP BY order_of_battle.id, crusade.name, faction.name, player.name
  `;
  const { rows } = await client.query<TableRow>(query, [playerId]);
  await client.end();

  return mapFromPSQL<Crusader.OrderOfBattle>(rows);
};

export const updateOrderOfBattleAsync = async (input: Crusader.OrderOfBattle) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE order_of_battle
    SET battles = $1,
        battles_won = $2,
        faction_id = $3,
        name = $4,
        notes = $5,
        requisition = $6,
        supply_limit = $7
    WHERE id = $8
  `;
  await client.query<TableRow>(query, [
    input.battles,
    input.battlesWon,
    input.factionId,
    input.name,
    input.notes,
    input.requisition,
    input.supplyLimit,
    input.id
  ]);
  await client.end();

  return getOrderOfBattleByIdAsync(input.id);
};
