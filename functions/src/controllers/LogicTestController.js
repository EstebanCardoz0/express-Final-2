import { LogicTest } from "../modules/LogicTest.js";
import { AttemptService } from "../services/AttemptService.js";
import { LogicTestService } from "../services/LogicTestService.js";

class LogicTestController {
  constructor(
    logicTestServi = new LogicTestService(),
    attemptServi = new AttemptService(),
  ) {
    this.logicTestServi = logicTestServi;
    this.attemptServi = attemptServi;
  }

  getLogicTestById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const logic = await this.logicTestServi.getLogicTestById(id);
      res.status(200).json(logic);
    } catch (error) {
      next(error);
    }
  };

  createLogicTest = async (req, res, next) => {
    try {
      const {
        title,
        difficulty,
        timeLimit,
        baseRewardFormula,
        penaltyFormula,
      } = req.body;
      const logic = new LogicTest(
        null,
        title,
        difficulty,
        timeLimit,
        baseRewardFormula,
        penaltyFormula,
      );
      await this.logicTestServi.createLogicTest(logic);
      res.status(201).json(logic);
    } catch (error) {
      next(error);
    }
  };
  // POST /logic-tests/:logicTestId/attempt
  attemptLogicTest = async (req, res, next) => {
    try {
      const { logicTestId } = req.params;
      const { botId, timeUsed } = req.body;

      const atte = { botId, logicTestId, timeUsed };
      await this.attemptServi.createAttempt(atte);
      res.status(200).json({ result: atte.result });
    } catch (error) {
      next(error);
    }
  };
}

export { LogicTestController };
