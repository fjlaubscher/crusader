import chalk from 'chalk';
import express from 'express';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// api
import BattlefieldRoleRouter from './api/battlefield-role';
import CrusadeRouter from './api/crusade';
import CrusadeCardRouter from './api/crusade-card';
import FactionRouter from './api/faction';
import OrderOfBattleRouter from './api/order-of-battle';
import PlayerRouter from './api/player';

// db
import { initDbAsync, DATABASE } from './db';

const initAPI = () => {
  const app = express();
  app.use(express.json());

  app.use('/api/battlefield-role', BattlefieldRoleRouter);
  app.use('/api/crusade', CrusadeRouter);
  app.use('/api/crusade-card', CrusadeCardRouter);
  app.use('/api/faction', FactionRouter);
  app.use('/api/order-of-battle', OrderOfBattleRouter);
  app.use('/api/player', PlayerRouter);

  app.get('/', (req, res) => {
    res.status(200).send('Crusader API is running');
  });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  app.listen(port, () =>
    console.log(chalk.green(`Crusader API is listening on http://localhost:${port}`))
  );
};

if (existsSync(DATABASE)) {
  initAPI();
} else {
  initDbAsync()
    .then(() => initAPI())
    .catch((ex) => console.log(chalk.red(ex.message)));
}
