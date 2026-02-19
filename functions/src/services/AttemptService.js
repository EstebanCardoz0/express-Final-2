import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { AttemptRepository } from "../repositories/AttemptRepository.js";
import { contador } from "../utils.js";
import { BotService } from "./BotService.js";
import { LogicTestService } from "./LogicTestService.js";

class AttemptService {
  constructor(
    atteRepo = new AttemptRepository(),
    botServi = new BotService(),
    logicTestServi = LogicTestService(),
  ) {
    this.atteRepo = atteRepo;
    this.botServi = botServi;
    this.logicTestServi = logicTestServi;
    this.contador = contador();
  }

  async getAttemptById(id) {
    const atte = await this.atteRepo.getAttemptById(id);
    if (!atte) {
      throw new EntityNotFoundError("No se econtró attempt con ese id");
    }
    return atte;
  }

  async createAttempt(botId, logicTestId, timeUsed) {
    const bot = await this.botServi.getBotById(botId);
    const logic = await this.logicTestServi.getLogicTestById(logicTestId);
    if (timeUsed <= logic.timeLimit) {
      
    }
  }
}

export { AttemptService };
