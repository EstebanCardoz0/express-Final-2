import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { LogicTest } from "../modules/LogicTest.js";
import { LogicTestRepository } from "../repositories/LogicTestRepository.js";
import { contador } from "../utils.js";

class LogicTestService {
  constructor(logicTestRepo = new LogicTestRepository()) {
    this.logicTestRepo = logicTestRepo;
    this.contador = contador();
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
    this.contador.aumentar();
    const nLogic = new LogicTest(
      this.contador.valorActual(),
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
