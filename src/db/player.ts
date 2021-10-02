import sqlite from "sqlite3";

import { DATABASE } from ".";

export const createPlayerAsync = (name: string) => {
  return new Promise<Crusader.ListItem>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `INSERT INTO Player (name) VALUES ($name)`,
      { $name: name },
      function (this, err) {
        if (err) {
          return reject(err);
        }

        db.get(
          `SELECT * from Player WHERE id = ${this.lastID}`,
          function (this, err, row: Crusader.ListItem) {
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

export const getPlayerByIdAsync = (id: number) => {
  return new Promise<Crusader.ListItem>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(
      `SELECT * FROM Player WHERE id = $id`,
      { $id: id },
      function (this, err: Error, row: Crusader.ListItem) {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      }
    );

    db.close();
  });
};

export const getPlayersAsync = (name?: string) => {
  return new Promise<Crusader.ListItem[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(
      `SELECT * FROM Player WHERE name LIKE $query`,
      { $query: name ? `%${name}%` : "%%" },
      function (this, err: Error, rows: Crusader.ListItem[]) {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      }
    );

    db.close();
  });
};
