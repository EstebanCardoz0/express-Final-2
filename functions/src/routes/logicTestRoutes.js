import { Router } from "express";
import { LogicTestController } from "../controllers/LogicTestController.js";

const router = new Router();
const loteCon = new LogicTestController();

router.post("/", loteCon.createLogicTest);
router.post("/:logicTestId/attempt", loteCon.attemptLogicTest);
router.get("/:id", loteCon.getLogicTestById);

export { router };
