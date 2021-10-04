import { Router } from "express";

// db
import { getBattlefieldRolesAsync } from "../db/battlefield-role";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const roles = await getBattlefieldRolesAsync();
    return res.status(200).json({ status: "ok", data: roles });
  } catch (ex: any) {
    return res.status(500).json({ status: "error", data: ex.message });
  }
});

export default router;
