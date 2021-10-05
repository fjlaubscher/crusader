import sqlite from 'sqlite3';

export const DATABASE = './build/crusader.sqlite';

const createTables = (db: sqlite.Database) => {
  db.exec(`
    DROP TABLE IF EXISTS BattlefieldRole;
    CREATE TABLE BattlefieldRole (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );
    CREATE INDEX ix_BattlefieldRole ON BattlefieldRole (id);
  `);

  db.exec(`
    DROP TABLE IF EXISTS Player;
    CREATE TABLE Player (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );
    CREATE INDEX ix_Player ON Player (id);
  `);

  db.exec(`
    DROP TABLE IF EXISTS Crusade;
    CREATE TABLE Crusade (
      id INTEGER PRIMARY KEY,
      createdDate TEXT NOT NULL,
      createdById INTEGER NOT NULL,
      name TEXT NOT NULL,
      notes TEXT NOT NULL,
      FOREIGN KEY (createdById) REFERENCES Player(id)
    );
    CREATE INDEX ix_Crusade ON Crusade (id);
    CREATE INDEX ix_PlayerCrusade ON Crusade (createdById);
  `);

  db.exec(`
    DROP TABLE IF EXISTS Faction;
    CREATE TABLE Faction (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );
    CREATE INDEX ix_Faction ON Faction (id);
  `);

  db.exec(`
    DROP TABLE IF EXISTS OrderOfBattle;
    CREATE TABLE OrderOfBattle (
      id INTEGER PRIMARY KEY,
      battles INTEGER NOT NULL,
      battlesWon INTEGER NOT NULL,
      crusadeId INTEGER NOT NULL,
      factionId INTEGER NOT NULL,
      name TEXT NOT NULL,
      notes TEXT NOT NULL,
      playerId INTEGER NOT NULL,
      requisition INTEGER NOT NULL,
      supplyLimit INTEGER NOT NULL,
      FOREIGN KEY (crusadeId) REFERENCES Crusade(id),
      FOREIGN KEY (factionId) REFERENCES Faction(id),
      FOREIGN KEY (playerId) REFERENCES Player(id)
    );
    CREATE INDEX ix_OrderOfBattle ON OrderOfBattle (id);
    CREATE INDEX ix_PlayerOrderOfBattle ON OrderOfBattle (playerId);
  `);

  db.exec(`
    DROP TABLE IF EXISTS CrusadeCard;
    CREATE TABLE CrusadeCard (
      id INTEGER PRIMARY KEY,
      abilities TEXT NOT NULL,
      battlefieldRoleId INTEGER NOT NULL,
      battleHonours TEXT NOT NULL,
      battleScars TEXT NOT NULL,
      battles INTEGER NOT NULL,
      battlesSurvived INTEGER NOT NULL,
      crusadePoints INTEGER NOT NULL,
      experiencePoints INTEGER NOT NULL,
      equipment TEXT NOT NULL,
      name TEXT NOT NULL,
      notes TEXT NOT NULL,
      orderOfBattleId INTEGER NOT NULL,
      powerRating TEXT NOT NULL,
      psychicPowers TEXT NOT NULL,
      relics TEXT NOT NULL,
      unitType TEXT NOT NULL,
      unitsDestroyedMelee INTEGER NOT NULL,
      unitsDestroyedPsychic INTEGER NOT NULL,
      unitsDestroyedRanged INTEGER NOT NULL,
      warlordTraits TEXT NOT NULL,
      FOREIGN KEY (battlefieldRoleId) REFERENCES BattlefieldRole(id),
      FOREIGN KEY (orderOfBattleId) REFERENCES OrderOfBattle(id)
    );
    CREATE INDEX ix_CrusadeCard ON CrusadeCard (id);
    CREATE INDEX ix_OrderOfBattleCrusadeCards ON CrusadeCard (orderOfBattleId);
  `);
};

const seedStandingData = (db: sqlite.Database) => {
  db.exec(`
    INSERT INTO BattlefieldRole (name) VALUES ('HQ');
    INSERT INTO BattlefieldRole (name) VALUES ('Troops');
    INSERT INTO BattlefieldRole (name) VALUES ('Elites');
    INSERT INTO BattlefieldRole (name) VALUES ('Fast Attack');
    INSERT INTO BattlefieldRole (name) VALUES ('Flyer');
    INSERT INTO BattlefieldRole (name) VALUES ('Heavy Support');
    INSERT INTO BattlefieldRole (name) VALUES ('Fortification');
    INSERT INTO BattlefieldRole (name) VALUES ('Dedicated Transport');
    INSERT INTO BattlefieldRole (name) VALUES ('Lord of War');
  `);

  db.exec(`
    INSERT INTO Faction (name) VALUES ('Aeldari');
    INSERT INTO Faction (name) VALUES ('Chaos');
    INSERT INTO Faction (name) VALUES ('Imperium');
    INSERT INTO Faction (name) VALUES ('Necrons');
    INSERT INTO Faction (name) VALUES ('Orks');
    INSERT INTO Faction (name) VALUES ('Tau Empire');
    INSERT INTO Faction (name) VALUES ('Tyranids');
  `);
};

export const initDbAsync = () => {
  return new Promise<boolean>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    createTables(db);
    seedStandingData(db);

    db.close((err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(true);
      }
    });
  });
};
