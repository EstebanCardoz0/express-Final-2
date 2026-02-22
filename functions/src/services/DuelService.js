import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { Duel } from "../modules/Duel.js";
import { DuelRepository } from "../repositories/DuelRepository.js";
import { BotService } from "./BotService.js";

class DuelService {
  constructor(duelRepo = new DuelRepository(), botServi = new BotService()) {
    this.duelRepo = duelRepo;
    this.botServi = botServi;
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

    const duels = await this.duelRepo.getAllDuels();
    const { getNextId } = await import("../utils.js");
    const nextId = getNextId(duels);

    bot1.battery -= 5;
    bot2.battery -= 5;

    if (bot1.battery < 10 || bot2.battery < 10) {
      throw new Error("Algun bot no cuenta con la batería suficiente, o ambos");
    }

    const perfo1 = this.calcularPerformance(bot1);
    const perfo2 = this.calcularPerformance(bot2);
    let result;

    const diff = Math.abs(perfo1 - perfo2);
    if (diff < 5) {
      bot1.xp += 10;
      bot2.xp += 10;
      result = "draw";
    } else if (perfo1 > perfo2) {
      bot1.xp += this.sumarXp(diff);
      bot2.xp += 10;
      result = `bot1 ${bot1.name}`;
    } else {
      bot2.xp += this.sumarXp(diff);
      bot1.xp += 10;
      result = `bot2 ${bot2.name}`;
    }

    try {
      await this.botServi.updateBot(bot1.id, {
        battery: bot1.battery,
        xp: bot1.xp,
        rank: bot1.rank,
      });
      await this.botServi.updateBot(bot2.id, {
        battery: bot2.battery,
        xp: bot2.xp,
        rank: bot2.rank,
      });
        let nDuel = new Duel(
          nextId,
        bot1.id,
        bot2.id,
        result,
        bot1.xp,
        bot2.xp,
        bot1.battery,
        bot2.battery,
        perfo1,
        perfo2,
      );
      await this.duelRepo.createDuel(nDuel);
      return nDuel;
    } catch (error) {
      throw new Error("Algo o varias cosas salieron mal" + error);
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
