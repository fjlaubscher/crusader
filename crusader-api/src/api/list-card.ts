import { Router } from 'express';

// db
import { createListCardAsync, deleteListCardAsync, getListCardByIdAsync } from '../db/list-card';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const card = await createListCardAsync(req.body as Crusader.ListCard);
    return res.status(200).json({ status: 'ok', data: card });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await deleteListCardAsync(id);
    return res.status(200).json({ status: 'ok', data: success });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const card = await getListCardByIdAsync(id);
    return res.status(200).json({ status: 'ok', data: card });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
