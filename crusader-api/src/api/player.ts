import { Router } from 'express';

// db
import { getCrusadesByPlayerIdAsync } from '../db/crusade';
import { getOrdersOfBattleByPlayerIdAsync } from '../db/order-of-battle';
import {
  createPlayerAsync,
  getPlayerByIdAsync,
  getPlayersAsync,
  updatePlayerAsync
} from '../db/player';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const player = await createPlayerAsync(req.body.name as string);
    return res.status(200).json({ status: 'ok', data: player });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const player = await updatePlayerAsync(req.body as Crusader.ListItem);
    return res.status(200).json({ status: 'ok', data: player });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/orders-of-battle', async (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const ordersOfBattle = await getOrdersOfBattleByPlayerIdAsync(playerId);
    return res.status(200).json({ status: 'ok', data: ordersOfBattle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/crusades', async (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const crusades = await getCrusadesByPlayerIdAsync(playerId);
    return res.status(200).json({ status: 'ok', data: crusades });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const player = await getPlayerByIdAsync(playerId);
    return res.status(200).json({ status: 'ok', data: player });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const playerName = req.query.name as string | undefined;
    const players = await getPlayersAsync(playerName);
    return res.status(200).json({ status: 'ok', data: players });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
