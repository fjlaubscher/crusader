import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// api
import BattleRouter from './api/battle';
import BattleStatusRouter from './api/battle-status';
import BattlefieldRoleRouter from './api/battlefield-role';
import CrusadeRouter from './api/crusade';
import CrusadeCardRouter from './api/crusade-card';
import FactionRouter from './api/faction';
import OrderOfBattleRouter from './api/order-of-battle';
import PlayerRouter from './api/player';

const initAPI = async () => {
  try {
    const app = express();
    app.use(express.json());

    app.use('/api/battle', BattleRouter);
    app.use('/api/battle-status', BattleStatusRouter);
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
      console.log(`Crusader API is listening on http://localhost:${port}`)
    );
  } catch (ex: any) {
    console.log(ex.stack);
  }
};

initAPI();
