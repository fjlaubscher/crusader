import sqlite from "sqlite3";

import { DATABASE } from ".";

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
        $supplyLimit: input.supplyLimit,
      },
      function (this, err) {
        if (err) {
          db.close();
          return reject(err);
        }

        db.get(
          `SELECT OrderOfBattle.*, IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints, IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed
           FROM OrderOfBattle
           LEFT OUTER JOIN CrusadeCard ON CrusadeCard.orderOfBattleId = OrderOfBattle.id
           WHERE OrderOfBattle.id = ${this.lastID}
           GROUP BY OrderOfBattle.id`,
          function (this, err, row: Crusader.OrderOfBattle) {
            if (err) {
              return reject(err);
            }

            return resolve(row);
          }
        );
      }
    );
  });
};

export const deleteOrderOfBattleAsync = (id: number) =>
  new Promise<boolean>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `DELETE FROM OrderOfBattle WHERE id = $id`,
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

export const getOrderOfBattleByIdAsync = (id: number) => {
  return new Promise<Crusader.OrderOfBattle>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(
      `SELECT OrderOfBattle.*, IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints, IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed
       FROM OrderOfBattle
       LEFT OUTER JOIN CrusadeCard ON CrusadeCard.orderOfBattleId = OrderOfBattle.id
       WHERE OrderOfBattle.id = ${id}
       GROUP BY OrderOfBattle.id`,
      function (this, err, row: Crusader.OrderOfBattle) {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      }
    );
  });
};

export const getOrdersOfBattleByCrusadeIdAsync = (crusadeId: number) => {
  return new Promise<Crusader.OrderOfBattle[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(
      `SELECT OrderOfBattle.*, IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints, IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed
      FROM OrderOfBattle
      LEFT OUTER JOIN CrusadeCard ON CrusadeCard.orderOfBattleId = OrderOfBattle.id
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
      `SELECT OrderOfBattle.*, IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints, IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed
       FROM OrderOfBattle
       LEFT OUTER JOIN CrusadeCard ON CrusadeCard.orderOfBattleId = OrderOfBattle.id
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
        $supplyLimit: input.supplyLimit,
      },
      function (this, err) {
        if (err) {
          db.close();
          return reject(err);
        }

        db.get(
          `SELECT OrderOfBattle.*, IFNULL(SUM(CrusadeCard.crusadePoints), 0) as crusadePoints, IFNULL(SUM(CrusadeCard.powerRating), 0) as supplyUsed
           FROM OrderOfBattle
           LEFT OUTER JOIN CrusadeCard ON CrusadeCard.orderOfBattleId = OrderOfBattle.id
           WHERE OrderOfBattle.id = ${input.id}
           GROUP BY OrderOfBattle.id`,
          function (this, err, row: Crusader.OrderOfBattle) {
            if (err) {
              return reject(err);
            }

            return resolve(row);
          }
        );
      }
    );
  });
};
