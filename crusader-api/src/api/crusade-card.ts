import { Router } from 'express';

// db
import {
  createCrusadeCardAsync,
  getCrusadeCardByIdAsync,
  updateCrusadeCardAsync,
  deleteCrusadeCardAsync
} from '../db/crusade-card';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const crusadeCard = await createCrusadeCardAsync(req.body as Crusader.CrusadeCard);
    return res.status(200).json({ status: 'ok', data: crusadeCard });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const crusadeCard = await updateCrusadeCardAsync(req.body as Crusader.CrusadeCard);
    return res.status(200).json({ status: 'ok', data: crusadeCard });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const crusadeCardId = parseInt(req.params.id);
    const crusadeCard = await deleteCrusadeCardAsync(crusadeCardId);
    return res.status(200).json({ status: 'ok', data: crusadeCard });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const crusadeCardId = parseInt(req.params.id);
    const crusadeCard = await getCrusadeCardByIdAsync(crusadeCardId);
    return res.status(200).json({ status: 'ok', data: crusadeCard });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
