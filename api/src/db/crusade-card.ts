import sqlite from "sqlite3";

import { DATABASE } from ".";

export const createCrusadeCardAsync = (input: Crusader.CrusadeCard) => {
  return new Promise<Crusader.CrusadeCard>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `INSERT INTO CrusadeCard (abilities, battlefieldRoleId, battleHonours, battleScars, battles, battlesSurvived, crusadePoints, experiencePoints, equipment, name, notes, orderOfBattleId, powerRating, psychicPowers, relics, unitType, unitsDestroyedMelee, unitsDestroyedPsychic, unitsDestroyedRanged, warlordTraits)
       VALUES ($abilities, $battlefieldRoleId, $battleHonours, $battleScars, $battles, $battlesSurvived, $crusadePoints, $experiencePoints, $equipment, $name, $notes, $orderOfBattleId, $powerRating, $psychicPowers, $relics, $unitType, $unitsDestroyedMelee, $unitsDestroyedPsychic, $unitsDestroyedRanged, $warlordTraits)`,
      {
        $abilities: input.abilities,
        $battlefieldRoleId: input.battlefieldRoleId,
        $battleHonours: input.battleHonours,
        $battleScars: input.battleScars,
        $battles: input.battles,
        $battlesSurvived: input.battlesSurvived,
        $crusadePoints: input.crusadePoints,
        $experiencePoints: input.experiencePoints,
        $equipment: input.equipment,
        $name: input.name,
        $notes: input.notes,
        $orderOfBattleId: input.orderOfBattleId,
        $powerRating: input.powerRating,
        $psychicPowers: input.psychicPowers,
        $relics: input.relics,
        $unitType: input.unitType,
        $unitsDestroyedMelee: input.unitsDestroyedMelee,
        $unitsDestroyedPsychic: input.unitsDestroyedPsychic,
        $unitsDestroyedRanged: input.unitsDestroyedRanged,
        $warlordTraits: input.warlordTraits,
      },
      function (this, err) {
        if (err) {
          return reject(err);
        }

        db.get(
          `SELECT * from CrusadeCard WHERE id = ${this.lastID}`,
          function (this, err, row: Crusader.CrusadeCard) {
            if (err) {
              return reject(err);
            }

            return resolve(row);
          }
        );
      }
    );

    db.close();
  });
};

export const deleteCrusadeCardAsync = (id: number) =>
  new Promise<boolean>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `DELETE FROM CrusadeCard WHERE id = $id`,
      { $id: id },
      function (this, err) {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      }
    );

    db.close();
  });

export const getCrusadeCardByIdAsync = (id: number) => {
  return new Promise<Crusader.CrusadeCard>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(
      `SELECT * FROM CrusadeCard WHERE id = $id`,
      { $id: id },
      function (this, err: Error, row: Crusader.CrusadeCard) {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      }
    );

    db.close();
  });
};

export const getCrusadeCardsByOrderOfBattleIdAsync = (
  orderOfBattleId: number
) => {
  return new Promise<Crusader.CrusadeCard[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(
      `SELECT * FROM CrusadeCard WHERE orderOfBattleId = $orderOfBattleId`,
      { $orderOfBattleId: orderOfBattleId },
      function (this, err: Error, rows: Crusader.CrusadeCard[]) {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      }
    );

    db.close();
  });
};

export const updateCrusadeCardAsync = (input: Crusader.CrusadeCard) => {
  return new Promise<Crusader.CrusadeCard>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `UPDATE CrusadeCard
       SET abilities = $abilities,
           battlefieldRoleId = $battlefieldRoleId,
           battleHonours = $battleHonours,
           battleScars = $battleScars,
           battles = $battles,
           battlesSurvived = $battlesSurvived,
           crusadePoints = $crusadePoints,
           experiencePoints = $experiencePoints,
           name = $name,
           notes = $notes,
           orderOfBattleId = $orderOfBattleId,
           powerRating = $powerRating,
           psychicPowers = $psychicPowers,
           relics = $relics,
           unitType = $unitType,
           unitsDestroyedMelee = $unitsDestroyedMelee,
           unitsDestroyedPsychic = $unitsDestroyedPsychic,
           unitsDestroyedRanged = $unitsDestroyedRanged,
           warlordTraits = $warlordTraits
       WHERE id = $id`,
      {
        $id: input.id,
        $abilities: input.abilities,
        $battlefieldRoleId: input.battlefieldRoleId,
        $battleHonours: input.battleHonours,
        $battleScars: input.battleScars,
        $battles: input.battles,
        $battlesSurvived: input.battlesSurvived,
        $crusadePoints: input.crusadePoints,
        $experiencePoints: input.experiencePoints,
        $equipment: input.equipment,
        $name: input.name,
        $notes: input.notes,
        $orderOfBattleId: input.orderOfBattleId,
        $powerRating: input.powerRating,
        $psychicPowers: input.psychicPowers,
        $relics: input.relics,
        $unitType: input.unitType,
        $unitsDestroyedMelee: input.unitsDestroyedMelee,
        $unitsDestroyedPsychic: input.unitsDestroyedPsychic,
        $unitsDestroyedRanged: input.unitsDestroyedRanged,
        $warlordTraits: input.warlordTraits,
      },
      function (this, err) {
        if (err) {
          return reject(err);
        }

        db.get(
          `SELECT * from CrusadeCard WHERE id = ${input.id}`,
          function (this, err, row: Crusader.CrusadeCard) {
            if (err) {
              return reject(err);
            }

            return resolve(row);
          }
        );
      }
    );

    db.close();
  });
};