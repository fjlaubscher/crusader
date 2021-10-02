import { Router } from "express";

// db
import {
  createCrusadeAsync,
  getCrusadeByIdAsync,
  getCrusadesAsync,
} from "../db/crusade";
import { getOrdersOfBattleByCrusadeIdAsync } from '../db/order-of-battle';

const router = Router();

router.post("/", async (req, res) => {
  try {
    const crusade = await createCrusadeAsync(req.body as Crusader.Crusade);
    return res.status(200).json({ status: "ok", data: crusade });
  } catch (ex: any) {
    return res.status(500).json({ status: "error", data: ex.message });
  }
});

router.get('/:id/orders-of-battle', async (req, res) => {
  try {
    const crusadeId = parseInt(req.params.id);
    const ordersOfBattle = await getOrdersOfBattleByCrusadeIdAsync(crusadeId);
    return res.status(200).json({ status: "ok", data: ordersOfBattle });
  } catch (ex: any) {
    return res.status(500).json({ status: "error", data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const crusadeId = parseInt(req.params.id);
    const crusade = await getCrusadeByIdAsync(crusadeId);
    return res.status(200).json({ status: "ok", data: crusade });
  } catch (ex: any) {
    return res.status(500).json({ status: "error", data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const crusadeName = req.query.name as string | undefined;
    const crusades = await getCrusadesAsync(crusadeName);
    return res.status(200).json({ status: "ok", data: crusades });
  } catch (ex: any) {
    return res.status(500).json({ status: "error", data: ex.message });
  }
});

export default router;
