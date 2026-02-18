import { Router } from "express";
import { BotController } from "../controllers/BotController.js";

const router = new Router();
const botCon = new BotController();

router.post("/", botCon.createBot);
router.get("/", botCon.getAllBots);
router.patch("/:id/modules", botCon.updateBotModules);
router.get("/:id", botCon.getBotById);
router.put("/:id", botCon.updateBot);
router.delete("/:id", botCon.deleteBot);

export { router };
