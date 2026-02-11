import { BotRepository } from "../repositories/botRepository.js";
import { contador, acumulador } from "../utils.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { Bot } from "../modules/Bots.js";
import { EntityNotFoundError } from './../../errors/EntityNotFoundError.js'

class BotService {
  botRepo = new BotRepository();
  conti = contador();

  constructor() { }

  createBot(name, generation, processing, memory, modules) {
    if (processing < 10 || processing > 200 || memory < 10 || memory > 200) {
      throw new OutOfRangeError();
    } else {
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
      return this.botRepo.createBot(nbot);
    }
  }

  async getBotById(id) {

    const busqueda = await this.botRepo.getBotById(id);

    if (!busqueda) {
      throw new EntityNotFoundError("Robot no encontrado");
    } else {
      return busqueda;
    }

  }
}

export { BotService };
