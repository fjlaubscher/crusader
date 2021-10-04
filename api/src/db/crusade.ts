import sqlite from "sqlite3";

import { DATABASE } from ".";

export const createCrusadeAsync = (input: Crusader.Crusade) => {
  return new Promise<Crusader.Crusade>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `INSERT INTO Crusade (name, createdDate, notes) VALUES ($name, $createdDate, $notes)`,
      {
        $name: input.name,
        $createdDate: input.createdDate,
        $notes: input.notes,
      },
      function (this, err) {
        if (err) {
          return reject(err);
        }

        db.get(
          `SELECT * from Crusade WHERE id = ${this.lastID}`,
          function (this, err, row: Crusader.Crusade) {
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

export const getCrusadesAsync = (name?: string) => {
  return new Promise<Crusader.Crusade[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(
      `SELECT * FROM Crusade WHERE name LIKE $query`,
      { $query: name ? `%${name}%` : "%%" },
      function (this, err: Error, rows: Crusader.Crusade[]) {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      }
    );

    db.close();
  });
};

export const getCrusadeByIdAsync = (id: number) => {
  return new Promise<Crusader.Crusade>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(
      `SELECT * FROM Crusade WHERE id = $id`,
      { $id: id },
      function (this, err: Error, row: Crusader.Crusade) {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      }
    );

    db.close();
  });
};

export const getCrusadesByPlayerIdAsync = (playerId: number) => {
  return new Promise<Crusader.Crusade[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(
      `SELECT c.* FROM Crusade c JOIN OrderOfBattle o ON o.crusadeId = c.id WHERE playerId = $playerId`,
      { $playerId: playerId },
      function (this, err: Error, rows: Crusader.Crusade[]) {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      }
    );

    db.close();
  });
};

export const updateCrusadeAsync = (input: Crusader.Crusade) => {
  return new Promise<Crusader.Crusade>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `UPDATE Crusade
       SET name = $name,
           notes = $notes
       WHERE id = $id
      `,
      {
        $id: input.id,
        $name: input.name,
        $notes: input.notes,
      },
      function (this, err) {
        if (err) {
          return reject(err);
        }

        db.get(
          `SELECT * from Crusade WHERE id = ${input.id}`,
          function (this, err, row: Crusader.Crusade) {
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
