import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getCrusadeCardByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT
      crusade_card.*, 
      battlefield_role.name as battlefield_role, 
      order_of_battle.name as order_of_battle, 
      COALESCE(SUM(crusade_card.units_destroyed_melee + crusade_card.units_destroyed_psychic + crusade_card.units_destroyed_ranged), 0) as units_destroyed
    FROM crusade_card
    INNER JOIN battlefield_role on battlefield_role.id = crusade_card.battlefield_role_id
    INNER JOIN order_of_battle on order_of_battle.id = crusade_card.order_of_battle_id
    WHERE crusade_card.id = $1
    GROUP BY crusade_card.id, battlefield_role.name, order_of_battle.name
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Crusader.CrusadeCard>(rows)[0];
};

export const createCrusadeCardAsync = async (input: Crusader.CrusadeCard) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO crusade_card (
      abilities, 
      battlefield_role_id, 
      battle_honours, 
      battle_scars, 
      battles, 
      battles_survived, 
      crusade_points, 
      experience_points, 
      equipment, 
      name, 
      notes, 
      order_of_battle_id, 
      power_rating, 
      psychic_powers, 
      relics, 
      unit_type, 
      units_destroyed_melee, 
      units_destroyed_psychic, 
      units_destroyed_ranged, 
      warlord_traits
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
    RETURNING *
  `;
  const { rows } = await client.query<TableRow>(query, [
    input.abilities,
    input.battlefieldRoleId,
    input.battleHonours,
    input.battleScars,
    input.battles,
    input.battlesSurvived,
    input.crusadePoints,
    input.experiencePoints,
    input.equipment,
    input.name,
    input.notes,
    input.orderOfBattleId,
    input.powerRating,
    input.psychicPowers,
    input.relics,
    input.unitType,
    input.unitsDestroyedMelee,
    input.unitsDestroyedPsychic,
    input.unitsDestroyedRanged,
    input.warlordTraits
  ]);
  await client.end();

  return getCrusadeCardByIdAsync(rows[0].id as number);
};

export const deleteCrusadeCardAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM crusade_card WHERE id = $1', [id]);
  await client.end();

  return rowCount === 1;
};

export const getCrusadeCardsByOrderOfBattleIdAsync = async (orderOfBattleId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT
      crusade_card.*, 
      battlefield_role.name as battlefield_role, 
      order_of_battle.name as order_of_battle, 
      COALESCE(SUM(crusade_card.units_destroyed_melee + crusade_card.units_destroyed_psychic + crusade_card.units_destroyed_ranged), 0) as units_destroyed
    FROM crusade_card
    INNER JOIN battlefield_role on battlefield_role.id = crusade_card.battlefield_role_id
    INNER JOIN order_of_battle on order_of_battle.id = crusade_card.order_of_battle_id
    WHERE crusade_card.order_of_battle_id = $1
    GROUP BY crusade_card.id, battlefield_role.name, order_of_battle.name
  `;
  const { rows } = await client.query<TableRow>(query, [orderOfBattleId]);
  await client.end();

  return mapFromPSQL<Crusader.CrusadeCard>(rows);
};

export const updateCrusadeCardAsync = async (input: Crusader.CrusadeCard) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE crusade_card
    SET abilities = $1,
        battlefield_role_id = $2,
        battle_honours = $3,
        battle_scars = $4,
        battles = $5,
        battles_survived = $6,
        crusade_points = $7,
        experience_points = $8,
        equipment = $9,
        name = $10,
        notes = $11,
        order_of_battle_id = $12,
        power_rating = $13,
        psychic_powers = $14,
        relics = $15,
        unit_type = $16,
        units_destroyed_melee = $17,
        units_destroyed_psychic = $18,
        units_destroyed_ranged = $19,
        warlord_traits = $20
    WHERE id = $21
  `;
  await client.query<TableRow>(query, [
    input.abilities,
    input.battlefieldRoleId,
    input.battleHonours,
    input.battleScars,
    input.battles,
    input.battlesSurvived,
    input.crusadePoints,
    input.experiencePoints,
    input.equipment,
    input.name,
    input.notes,
    input.orderOfBattleId,
    input.powerRating,
    input.psychicPowers,
    input.relics,
    input.unitType,
    input.unitsDestroyedMelee,
    input.unitsDestroyedPsychic,
    input.unitsDestroyedRanged,
    input.warlordTraits,
    input.id
  ]);
  await client.end();

  return getCrusadeCardByIdAsync(input.id);
};
