import { Router } from 'express';

// db
import { getFactionsAsync } from '../db/faction';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const factions = await getFactionsAsync();
    return res.status(200).json({ status: 'ok', data: factions });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
