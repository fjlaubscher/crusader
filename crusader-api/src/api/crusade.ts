import { Router } from 'express';

// db
import { getBattlesByCrusadeIdAsync } from '../db/battle';
import {
  createCrusadeAsync,
  deleteCrusadeAsync,
  getCrusadeByIdAsync,
  updateCrusadeAsync
} from '../db/crusade';
import { getOrdersOfBattleByCrusadeIdAsync } from '../db/order-of-battle';

const router = Router();

router.put('/', async (req, res) => {
  try {
    const crusade = await updateCrusadeAsync(req.body as Crusader.Crusade);
    return res.status(200).json({ status: 'ok', data: crusade });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const crusade = await createCrusadeAsync(req.body as Crusader.Crusade);
    return res.status(200).json({ status: 'ok', data: crusade });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/orders-of-battle', async (req, res) => {
  try {
    const crusadeId = parseInt(req.params.id);
    const ordersOfBattle = await getOrdersOfBattleByCrusadeIdAsync(crusadeId);
    return res.status(200).json({ status: 'ok', data: ordersOfBattle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/battles', async (req, res) => {
  try {
    const crusadeId = parseInt(req.params.id);
    const battles = await getBattlesByCrusadeIdAsync(crusadeId);
    return res.status(200).json({ status: 'ok', data: battles });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const crusadeId = parseInt(req.params.id);
    const success = await deleteCrusadeAsync(crusadeId);
    return res.status(200).json({ status: 'ok', data: success });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const crusadeId = parseInt(req.params.id);
    const crusade = await getCrusadeByIdAsync(crusadeId);
    return res.status(200).json({ status: 'ok', data: crusade });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
