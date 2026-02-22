import { BotRepository } from "../repositories/BotRepository.js";
import { acumulador, updateRank } from "../utils.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { Bot } from "../modules/Bot.js";
import { EntityNotFoundError } from "./../../errors/EntityNotFoundError.js";

class BotService {
  constructor(botRepo = new BotRepository()) {
    this.botRepo = botRepo;
  }

  async createBot(name, generation, processing, memory, modules) {
    if (processing < 10 || processing > 200 || memory < 10 || memory > 200) {
      throw new OutOfRangeError();
    }
    let contadorPeso = acumulador();
    for (const p of modules) {
      contadorPeso.acumular(p.weight);
    }
    if (contadorPeso.obtenerTotal() > 100) {
      throw new OutOfRangeError("error. El total de peso es mayor a 100");
    }

    // Calcular el próximo id como el máximo existente + 1
    const bots = await this.botRepo.getAllBots();
    const nextId = bots.length ? Math.max(...bots.map((b) => b.id)) + 1 : 1;
    const nbot = new Bot(nextId, name, generation, processing, memory);
    nbot.modules = modules;
    return await this.botRepo.createBot(nbot);
  }

  async getAllBots() {
    return await this.botRepo.getAllBots();
  }

  async getBotById(id) {
    const busqueda = await this.botRepo.getBotById(id);

    if (!busqueda) {
      throw new EntityNotFoundError("Robot no encontrado");
    }
    return busqueda;
  }

  async updateBot(id, data) {
    await this.getBotById(id);

    if (data.processing !== undefined) {
      if (data.processing < 10 || data.processing > 200) {
        throw new OutOfRangeError();
      }
    }
    if (data.memory != undefined) {
      if (data.memory < 10 || data.memory > 200) {
        throw new OutOfRangeError();
      }
    }
    if (data.modules !== undefined) {
      let contadorPeso = acumulador();
      for (const p of data.modules) {
        contadorPeso.acumular(p.weight);
      }
      if (contadorPeso.obtenerTotal() > 100) {
        throw new OutOfRangeError("error. peso mayor a 100");
      }
    }
    return await this.botRepo.updateBot(id, data);
  }

  async updateBotModules(id, modules) {
    let contadorPeso = acumulador();
    for (const p of modules) {
      contadorPeso.acumular(p.weight);
    }
    if (contadorPeso.obtenerTotal() > 100) {
      throw new OutOfRangeError("error. El total de peso es mayor a 100");
    }
    await this.updateBot(id, { modules });
    return await this.getBotById(id);
  }

  async deleteBot(id) {
    await this.getBotById(id);
    return await this.botRepo.deleteBot(id);
  }

  addXpAndUpdateRank(bot, xpAmount) {
    bot.xp += xpAmount;
    updateRank(bot);
  }
}

export { BotService };
