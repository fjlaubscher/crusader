import sqlite from 'sqlite3';

import { DATABASE } from '.';

const selectOrderOfBattle = (id: number) => `
  SELECT 
    OrderOfBattle.*, 
    IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints,
    IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed,
    Crusade.name as crusade,
    Player.name as Player
  FROM OrderOfBattle
  INNER JOIN Crusade ON OrderOfBattle.crusadeId = Crusade.Id
  INNER JOIN Player ON OrderOfBattle.playerId = Player.id
  LEFT OUTER JOIN CrusadeCard ON OrderOfBattle.id = CrusadeCard.orderOfBattleId
  WHERE OrderOfBattle.id = ${id}
  GROUP BY OrderOfBattle.id`;

export const createOrderOfBattleAsync = (input: Crusader.OrderOfBattle) => {
  return new Promise<Crusader.OrderOfBattle>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `INSERT INTO OrderOfBattle (battles, battlesWon, crusadeId, factionId, name, notes, playerId, requisition, supplyLimit)
       VALUES ($battles, $battlesWon, $crusadeId, $factionId, $name, $notes, $playerId, $requisition, $supplyLimit)`,
      {
        $battles: input.battles,
        $battlesWon: input.battlesWon,
        $crusadeId: input.crusadeId,
        $factionId: input.factionId,
        $name: input.name,
        $notes: input.notes,
        $playerId: input.playerId,
        $requisition: input.requisition,
        $supplyLimit: input.supplyLimit
      },
      function (this, err) {
        if (err) {
          db.close();
          return reject(err);
        }

        db.get(selectOrderOfBattle(this.lastID), function (this, err, row: Crusader.OrderOfBattle) {
          if (err) {
            return reject(err);
          }

          return resolve(row);
        });
      }
    );
  });
};

export const deleteOrderOfBattleAsync = (id: number) =>
  new Promise<boolean>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(`DELETE FROM OrderOfBattle WHERE id = $id`, { $id: id }, function (this, err) {
      if (err) {
        return reject(err);
      }

      return resolve(true);
    });

    db.close();
  });

export const getOrderOfBattleByIdAsync = (id: number) => {
  return new Promise<Crusader.OrderOfBattle>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(selectOrderOfBattle(id), function (this, err, row: Crusader.OrderOfBattle) {
      if (err) {
        return reject(err);
      }

      return resolve(row);
    });
  });
};

export const getOrdersOfBattleByCrusadeIdAsync = (crusadeId: number) => {
  return new Promise<Crusader.OrderOfBattle[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(`
      SELECT
        OrderOfBattle.*, 
        IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints,
        IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed,
        Crusade.name as crusade,\
        Faction.name as faction,
        Player.name as player
      FROM OrderOfBattle
      INNER JOIN Crusade ON OrderOfBattle.crusadeId = Crusade.id
      INNER JOIN Faction ON OrderOfBattle.factionId = Faction.id
      INNER JOIN Player ON OrderOfBattle.playerId = Player.id
      LEFT OUTER JOIN CrusadeCard ON OrderOfBattle.id = CrusadeCard.orderOfBattleId
      WHERE OrderOfBattle.crusadeId = $crusadeId
      GROUP BY OrderOfBattle.id`,
      { $crusadeId: crusadeId },
      function (this, err: Error, rows: Crusader.OrderOfBattle[]) {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      }
    );

    db.close();
  });
};

export const getOrdersOfBattleByPlayerIdAsync = (playerId: number) => {
  return new Promise<Crusader.OrderOfBattle[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(
      `SELECT
        OrderOfBattle.*, 
        IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints,
        IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed,
        Crusade.name as crusade,
        Player.name as Player
      FROM OrderOfBattle
      INNER JOIN Crusade ON OrderOfBattle.crusadeId = Crusade.Id
      INNER JOIN Player ON OrderOfBattle.playerId = Player.id
      LEFT OUTER JOIN CrusadeCard ON OrderOfBattle.id = CrusadeCard.orderOfBattleId
      WHERE OrderOfBattle.playerId = $playerId
      GROUP BY OrderOfBattle.id`,
      { $playerId: playerId },
      function (this, err: Error, rows: Crusader.OrderOfBattle[]) {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      }
    );

    db.close();
  });
};

export const updateOrderOfBattleAsync = (input: Crusader.OrderOfBattle) => {
  return new Promise<Crusader.OrderOfBattle>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `UPDATE OrderOfBattle
       SET battles = $battles,
           battlesWon = $battlesWon,
           factionId = $factionId,
           name = $name,
           notes = $notes,
           requisition = $requisition,
           supplyLimit = $supplyLimit
       WHERE id = $id`,
      {
        $id: input.id,
        $battles: input.battles,
        $battlesWon: input.battlesWon,
        $factionId: input.factionId,
        $name: input.name,
        $notes: input.notes,
        $requisition: input.requisition,
        $supplyLimit: input.supplyLimit
      },
      function (this, err) {
        if (err) {
          db.close();
          return reject(err);
        }

        db.get(selectOrderOfBattle(input.id), function (this, err, row: Crusader.OrderOfBattle) {
          if (err) {
            return reject(err);
          }

          return resolve(row);
        });
      }
    );
  });
};
