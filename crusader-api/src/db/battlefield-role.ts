import sqlite from 'sqlite3';

import { DATABASE } from '.';

export const getBattlefieldRolesAsync = () => {
  return new Promise<Crusader.ListItem[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(`SELECT * FROM BattlefieldRole`, function (this, err: Error, rows: Crusader.ListItem[]) {
      if (err) {
        return reject(err);
      }

      return resolve(rows);
    });

    db.close();
  });
};
