import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { LogicTest } from "../modules/LogicTest.js";
import { LogicTestRepository } from "../repositories/LogicTestRepository.js";

class LogicTestService {
  constructor(logicTestRepo = new LogicTestRepository()) {
    this.logicTestRepo = logicTestRepo;
  }

  async getLogicTestById(id) {
    const logicTest = await this.logicTestRepo.getLogicTestById(id);
    if (!logicTest) {
      throw new EntityNotFoundError("No se encontró logicTest con ese Id");
    }
    return logicTest;
  }

  async createLogicTest(
    title,
    difficulty,
    timeLimit,
    baseRewardFormula,
    penaltyFormula,
  ) {
    const logicTests = await this.logicTestRepo.getAllLogicTests();
    const { getNextId } = await import("../utils.js");
    const nextId = getNextId(logicTests);
    const nLogic = new LogicTest(
      nextId,
      title,
      difficulty,
      timeLimit,
      baseRewardFormula,
      penaltyFormula,
    );
    return this.logicTestRepo.createLogicTest(nLogic);
  }
}

export { LogicTestService };
