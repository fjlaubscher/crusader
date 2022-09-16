import { Router } from 'express';

// db
import {
  createBattleAsync,
  updateBattleAsync,
  deleteBattleAsync,
  getBattleByIdAsync
} from '../db/battle';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const battle = await createBattleAsync(req.body as Crusader.Battle);
    return res.status(200).json({ status: 'ok', data: battle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const battle = await updateBattleAsync(req.body as Crusader.Battle);
    return res.status(200).json({ status: 'ok', data: battle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const battleId = parseInt(req.params.id);
    const success = await deleteBattleAsync(battleId);
    return res.status(200).json({ status: 'ok', data: success });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const battleId = parseInt(req.params.id);
    const battle = await getBattleByIdAsync(battleId);
    return res.status(200).json({ status: 'ok', data: battle });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
