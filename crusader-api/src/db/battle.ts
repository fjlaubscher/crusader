import { Client } from 'pg';
import { parseISO } from 'date-fns';
import { mapFromPSQL } from '../helpers';

export const getBattleByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT battle.*, crusade.name as crusade, battle_status.name as status, attacker.name as attacker_order_of_battle, defender.name as defender_order_of_battle
    FROM battle
    INNER JOIN crusade ON battle.crusade_id = crusade.id
    INNER JOIN battle_status ON battle.status_id = battle_status.id
    INNER JOIN order_of_battle attacker ON battle.attacker_order_of_battle_id = attacker.id
    INNER JOIN order_of_battle defender ON battle.defender_order_of_battle_id = defender.id
    WHERE battle.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Crusader.Battle>(rows)[0];
};

export const createBattleAsync = async (input: Crusader.Battle) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO battle (
      crusade_id,
      attacker_order_of_battle_id,
      attacker_score,
      defender_order_of_battle_id,
      defender_score,
      mission,
      size,
      name,
      notes,
      status_id,
      created_date
    )
    VALUES ($1, $2, 0, $3, 0, $4, $5, $6, $7, 1, $8)
    RETURNING *    
  `;

  const { rows } = await client.query<TableRow>(query, [
    input.crusadeId,
    input.attackerOrderOfBattleId,
    input.defenderOrderOfBattleId,
    input.mission,
    input.size,
    input.name,
    input.notes,
    parseISO(input.createdDate)
  ]);
  await client.end();

  return getBattleByIdAsync(rows[0].id as number);
};

export const getBattlesByCrusadeIdAsync = async (crusadeId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT battle.*, crusade.name as crusade, battle_status.name as status, attacker.name as attacker_order_of_battle, defender.name as defender_order_of_battle
    FROM battle
    INNER JOIN crusade ON battle.crusade_id = crusade.id
    INNER JOIN battle_status ON battle.status_id = battle_status.id
    INNER JOIN order_of_battle attacker ON battle.attacker_order_of_battle_id = attacker.id
    INNER JOIN order_of_battle defender ON battle.defender_order_of_battle_id = defender.id
    WHERE battle.crusade_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [crusadeId]);
  await client.end();

  return mapFromPSQL<Crusader.Battle>(rows);
};

export const getBattlesByOrderOfBattleIdAsync = async (orderOfBattleId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT battle.*, crusade.name as crusade, battle_status.name as status, attacker.name as attacker_order_of_battle, defender.name as defender_order_of_battle
    FROM battle
    INNER JOIN crusade ON battle.crusade_id = crusade.id
    INNER JOIN battle_status ON battle.status_id = battle_status.id
    INNER JOIN order_of_battle attacker ON battle.attacker_order_of_battle_id = attacker.id
    INNER JOIN order_of_battle defender ON battle.defender_order_of_battle_id = defender.id
    WHERE battle.attacker_order_of_battle_id = $1 OR battle.defender_order_of_battle_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [orderOfBattleId]);
  await client.end();

  return mapFromPSQL<Crusader.Battle>(rows);
};

export const updateBattleAsync = async (input: Crusader.Battle) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE battle
    SET 
      attacker_score = $1,
      defender_score = $2,
      mission = $3,
      name = $4,
      notes = $5,
      status_id = $6,
    )
    WHERE id = $7
  `;
  await client.query<TableRow>(query, [
    input.attackerScore,
    input.defenderScore,
    input.mission,
    input.name,
    input.notes,
    input.statusId
  ]);
  await client.end();

  return getBattleByIdAsync(input.id);
};

export const deleteBattleAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM battle WHERE id = $1', [id]);
  await client.end();

  return rowCount === 1;
};
