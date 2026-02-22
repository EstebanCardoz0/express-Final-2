import fs from "fs/promises";
import { readAndParse } from "../utils.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";

class BotRepository {
  url = "./functions/src/repositories/league.json";

  getAllBots = async () => {
    return (await readAndParse(this.url)).bots;
  };

  getBotById = async (id) => {
    const data = await readAndParse(this.url);
    return data.bots.find((d) => d.id === Number(id));
  };

  async createBot(bot) {
    const data = await readAndParse(this.url);
    const validateId = await this.getBotById(bot.id);
    if (validateId) {
      throw new DuplicateError("Ya existe un bot con ese id, ponle otro");
    }
    data.bots.push(bot);
    await fs.writeFile(this.url, JSON.stringify(data, null, 2));
    return bot;
  }

  async updateBot(id, datos) {
    const data = await readAndParse(this.url);
    const botIndex = data.bots.findIndex((d) => d.id === Number(id));
    if (botIndex < 0) {
      throw new EntityNotFoundError("No se encontró el bot a actualizar");
    }
    data.bots[botIndex] = { ...data.bots[botIndex], ...datos };

    await fs.writeFile(this.url, JSON.stringify(data, null, 2));
    return await this.getBotById(id);
  }

  async deleteBot(id) {
    const data = await readAndParse(this.url);
    const withDelete = data.bots.filter((f) => f.id !== Number(id));
    const length = data.bots.length;
    data.bots = withDelete;
    await fs.writeFile(this.url, JSON.stringify(data, null, 2));
    const deleted = data.bots.length < length;
    if (deleted) {
      return "Exito al eliminar"
    } else {
      throw new Error("Algo salió mal");
    }

  }
}

export { BotRepository };
