import { Router } from 'express';

// db
import { getCrusadeCardsByListIdAsync } from '../db/crusade-card';
import { getListByIdAsync, createListAsync, updateListAsync, deleteListAsync } from '../db/list';
import { getListCardsByListIdAsync } from '../db/list-card';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const list = await createListAsync(req.body as Crusader.List);
    return res.status(200).json({ status: 'ok', data: list });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const list = await updateListAsync(req.body as Crusader.List);
    return res.status(200).json({ status: 'ok', data: list });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const listId = parseInt(req.params.id);
    const success = await deleteListAsync(listId);
    return res.status(200).json({ status: 'ok', data: success });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/cards', async (req, res) => {
  try {
    const listId = parseInt(req.params.id);
    const crusadeCards = await getListCardsByListIdAsync(listId);
    return res.status(200).json({ status: 'ok', data: crusadeCards });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/crusade-cards', async (req, res) => {
  try {
    const listId = parseInt(req.params.id);
    const crusadeCards = await getCrusadeCardsByListIdAsync(listId);
    return res.status(200).json({ status: 'ok', data: crusadeCards });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listId = parseInt(req.params.id);
    const list = await getListByIdAsync(listId);
    return res.status(200).json({ status: 'ok', data: list });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
