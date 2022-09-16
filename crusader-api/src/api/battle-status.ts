import { Router } from 'express';

// db
import { getBattleStatusesAsync } from '../db/battle-status';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const statuses = await getBattleStatusesAsync();
    return res.status(200).json({ status: 'ok', data: statuses });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
