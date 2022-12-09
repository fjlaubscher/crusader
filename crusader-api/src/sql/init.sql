-- Battlefield Role
CREATE TABLE battlefield_role
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
CREATE INDEX ix_battlefield_role ON battlefield_role (id);

-- Player
CREATE TABLE player (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  avatar VARCHAR(1000) NOT NULL,
  notes VARCHAR(2000) NOT NULL
);
CREATE INDEX ix_player ON player(id);

-- Faction
CREATE TABLE faction (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
CREATE INDEX ix_faction ON faction(id);

-- Battle Status
CREATE TABLE battle_status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
CREATE INDEX ix_battle_status ON battle_status(id);

-- Crusade
CREATE TABLE crusade (
  id SERIAL PRIMARY KEY,
  created_date date NOT NULL,
  created_by_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  notes VARCHAR(2000) NOT NULL,
  avatar VARCHAR(1000) NOT NULL,
  FOREIGN KEY (created_by_id) REFERENCES player(id) ON DELETE CASCADE
);
CREATE INDEX ix_crusade ON crusade(id);
CREATE INDEX ix_player_crusade ON crusade(created_by_id);

-- Order of Battle
CREATE TABLE order_of_battle (
  id SERIAL PRIMARY KEY,
  battles INTEGER NOT NULL,
  battles_won INTEGER NOT NULL,
  crusade_id INTEGER NOT NULL,
  faction_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  notes VARCHAR(2000) NOT NULL,
  player_id INTEGER NOT NULL,
  requisition INTEGER NOT NULL,
  supply_limit INTEGER NOT NULL,
  avatar VARCHAR(1000) NOT NULL,
  FOREIGN KEY (crusade_id) REFERENCES crusade(id) ON DELETE CASCADE,
  FOREIGN KEY (faction_id) REFERENCES faction(id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE
);
CREATE INDEX ix_order_of_battle ON order_of_battle(id);
CREATE INDEX ix_player_order_of_battle ON order_of_battle(player_id);

-- Battle
CREATE TABLE battle (
  id SERIAL PRIMARY KEY,
  crusade_id INTEGER NOT NULL,
  attacker_order_of_battle_id INTEGER NOT NULL,
  attacker_score INTEGER NOT NULL,
  defender_order_of_battle_id INTEGER NOT NULL,
  defender_score INTEGER NOT NULL,
  mission VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  notes VARCHAR(2000) NOT NULL,
  status_id INTEGER NOT NULL,
  created_date date NOT NULL,
  avatar VARCHAR(1000) NOT NULL,
  FOREIGN KEY (attacker_order_of_battle_id) REFERENCES order_of_battle(id) ON DELETE CASCADE,
  FOREIGN KEY (defender_order_of_battle_id) REFERENCES order_of_battle(id) ON DELETE CASCADE,
  FOREIGN KEY (status_id) REFERENCES battle_status(id) ON DELETE CASCADE,
  FOREIGN KEY (crusade_id) REFERENCES crusade(id) ON DELETE CASCADE
);
CREATE INDEX ix_battle ON battle(id);
CREATE INDEX ix_attacker_order_of_battle_battle ON battle(attacker_order_of_battle_id);
CREATE INDEX ix_defender_order_of_battle_battle ON battle(defender_order_of_battle_id);
CREATE INDEX ix_crusade_battle ON battle(crusade_id);

-- Crusade Card
CREATE TABLE crusade_card (
  id SERIAL PRIMARY KEY,
  abilities VARCHAR(2000) NOT NULL,
  battlefield_role_id INTEGER NOT NULL,
  battle_honours VARCHAR(2000) NOT NULL,
  battle_scars VARCHAR(2000) NOT NULL,
  battles INTEGER NOT NULL,
  battles_survived INTEGER NOT NULL,
  crusade_points INTEGER NOT NULL,
  experience_points INTEGER NOT NULL,
  equipment VARCHAR(2000) NOT NULL,
  name VARCHAR(50) NOT NULL,
  notes VARCHAR(2000) NOT NULL,
  order_of_battle_id INTEGER NOT NULL,
  power_rating INTEGER NOT NULL,
  psychic_powers VARCHAR(2000) NOT NULL,
  relics VARCHAR(2000) NOT NULL,
  unit_type VARCHAR(50) NOT NULL,
  units_destroyed_melee INTEGER NOT NULL,
  units_destroyed_psychic INTEGER NOT NULL,
  units_destroyed_ranged INTEGER NOT NULL,
  warlord_traits VARCHAR(2000) NOT NULL,
  avatar VARCHAR(1000) NOT NULL,
  FOREIGN KEY (battlefield_role_id) REFERENCES battlefield_role(id) ON DELETE CASCADE,
  FOREIGN KEY (order_of_battle_id) REFERENCES order_of_battle(id) ON DELETE CASCADE
);
CREATE INDEX ix_crusade_card ON crusade_card(id);
CREATE INDEX ix_order_of_battle_crusade_card ON crusade_card(order_of_battle_id);

CREATE TABLE list (
  id SERIAL PRIMARY KEY,
  order_of_battle_id INTEGER NOT NULL,
  size INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  notes VARCHAR(2000) NOT NULL,
  FOREIGN KEY (order_of_battle_id) REFERENCES order_of_battle(id) ON DELETE CASCADE
);
CREATE INDEX ix_list ON list(id);
CREATE INDEX ix_order_of_battle_list ON list(order_of_battle_id);

CREATE TABLE list_card (
  id SERIAL PRIMARY KEY,
  list_id INTEGER NOT NULL,
  crusade_card_id INTEGER NOT NULL,
  FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE,
  FOREIGN KEY (crusade_card_id) REFERENCES crusade_card(id) ON DELETE CASCADE
);
CREATE INDEX ix_list_card ON list_card(id);
CREATE INDEX ix_list_card_list ON list_card(list_id);
CREATE INDEX ix_list_card_card ON list_card(crusade_card_id);

-- seed data
INSERT INTO battlefield_role (name) VALUES ('HQ');
INSERT INTO battlefield_role (name) VALUES ('Troops');
INSERT INTO battlefield_role (name) VALUES ('Elites');
INSERT INTO battlefield_role (name) VALUES ('Fast Attack');
INSERT INTO battlefield_role (name) VALUES ('Flyer');
INSERT INTO battlefield_role (name) VALUES ('Heavy Support');
INSERT INTO battlefield_role (name) VALUES ('Fortification');
INSERT INTO battlefield_role (name) VALUES ('Dedicated Transport');
INSERT INTO battlefield_role (name) VALUES ('Lord of War');

INSERT INTO battle_status (name) VALUES ('Pending');
INSERT INTO battle_status (name) VALUES ('Active');
INSERT INTO battle_status (name) VALUES ('Complete');

INSERT INTO faction (name) VALUES ('Aeldari');
INSERT INTO faction (name) VALUES ('Chaos');
INSERT INTO faction (name) VALUES ('Imperium');
INSERT INTO faction (name) VALUES ('Necrons');
INSERT INTO faction (name) VALUES ('Orks');
INSERT INTO faction (name) VALUES ('Tau Empire');
INSERT INTO faction (name) VALUES ('Tyranids');
INSERT INTO faction (name) VALUES ('Votann');
