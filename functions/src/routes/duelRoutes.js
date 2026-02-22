import { Router } from "express";
import { DuelController } from "../controllers/DuelController.js";

const router = Router();
const duelCon = new DuelController();

router.get("/", duelCon.getAllDuels);
router.post("/", duelCon.createDuel);
router.get("/:id", duelCon.getDuelById);

export { router };
