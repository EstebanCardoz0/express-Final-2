import { BotRepository } from "../repositories/BotRepository.js";
import { contador, acumulador } from "../utils.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { Bot } from "../modules/Bot.js";
import { EntityNotFoundError } from "./../../errors/EntityNotFoundError.js";

class BotService {
  constructor(botRepo = new BotRepository()) {
    this.botRepo = botRepo;
    this.conti = contador();
  }

  createBot(name, generation, processing, memory, modules) {
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
    this.conti.aumentar();
    const nbot = new Bot(
      this.conti.valorActual(),
      name,
      generation,
      processing,
      memory,
    );
    nbot.modules = modules;
    return this.botRepo.createBot(nbot);
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
    return this.botRepo.updateBot(id, data);
  }

  async deleteBot(id) {
  const   toDelete = await this.getBotById(id);
    if (toDelete !== undefined) {
      return this.botRepo.deleteBot(id);
    } else {
      throw new EntityNotFoundError("Bot a borrar no encontrado");
    }
  }
}

export { BotService };
