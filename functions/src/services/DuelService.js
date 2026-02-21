import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { DuelRepository } from "../repositories/DuelRepository.js";
import { contador } from "../utils.js";
import { BotService } from "./BotService.js";

class DuelService {
  constructor(duelRepo = new DuelRepository(), botServi = new BotService()) {
    this.duelRepo = duelRepo;
    this.botServi = botServi;
    this.contador = contador();
  }

  getAllDuels = async () => {
    return await this.duelRepo.getAllDuels();
  };

  getDuelById = async (id) => {
    const duel = await this.duelRepo.getDuelById(id);
    if (!duel) {
      throw new EntityNotFoundError("no se encontró duel con ese id");
    }
    return duel;
  };

  createDuel = async (bot1Id, bot2Id) => {
    const bot1 = await this.botServi.getBotById(bot1Id);
    const bot2 = await this.botServi.getBotById(bot2Id);
    this.contador.aumentar();

    bot1.battery -= 5;
    bot2.battery -= 5;

    if (bot1.battery < 10 || bot2.battery < 10) {
      throw new Error("Algun bot no cuenta con la batería suficiente, o ambos");
    }

    const perfo1 = this.calcularPerformance(bot1);
    const perfo2 = this.calcularPerformance(bot2);

    const diff = Math.abs(perfo1 - perfo2);
    if (diff < 5) {
      bot1.xp += 10;
      bot2.xp += 10;
    } else if (perfo1 > perfo2) {
      bot1.xp += this.sumarXp(bot1);
      bot2.xp += 10;
    } else {
      bot2.xp += this.sumarXp(bot2);
      bot1.xp += 10;
    }
  };

  sumarXp(diff) {
    if (diff < 15) return 30;
    else if (diff < 40) return 60;
    else if (diff < 80) return 90;
    else return 130;
  }

  calcularPerformance(bot) {
    const baseCapacity = bot.baseCapacity;
    const modulesPower = bot.modules.reduce((sum, mod) => {
      if (mod.bonusType === "attack") return sum + mod.weight;
      if (mod.bonusType === "logic") return sum + 2 * mod.weight;
      return sum;
    }, 0);
    const stability = 100 - Math.abs(bot.processing - bot.memory) / 2;

    const perfo =
      baseCapacity +
      bot.rank * 10 +
      bot.battery * 0.5 +
      bot.xp / 10 +
      modulesPower +
      stability / 5;

    return perfo;
  }
}

export { DuelService };
