import { Router } from 'express';

// db
import { getCrusadeCardsByOrderOfBattleIdAsync } from '../db/crusade-card';
import {
  createOrderOfBattleAsync,
  getOrderOfBattleByIdAsync,
  updateOrderOfBattleAsync,
  deleteOrderOfBattleAsync
} from '../db/order-of-battle';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const orderOfBattle = await createOrderOfBattleAsync(req.body as Crusader.OrderOfBattle);
    return res.status(200).json({ status: 'ok', data: orderOfBattle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const orderOfBattle = await updateOrderOfBattleAsync(req.body as Crusader.OrderOfBattle);
    return res.status(200).json({ status: 'ok', data: orderOfBattle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const orderofBattleId = parseInt(req.params.id);
    const success = await deleteOrderOfBattleAsync(orderofBattleId);
    return res.status(200).json({ status: 'ok', data: success });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/crusade-cards', async (req, res) => {
  try {
    const orderOfBattleId = parseInt(req.params.id);
    const crusadeCards = await getCrusadeCardsByOrderOfBattleIdAsync(orderOfBattleId);
    return res.status(200).json({ status: 'ok', data: crusadeCards });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const orderOfBattleId = parseInt(req.params.id);
    const orderOfBattle = await getOrderOfBattleByIdAsync(orderOfBattleId);
    return res.status(200).json({ status: 'ok', data: orderOfBattle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
