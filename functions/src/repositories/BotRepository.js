import fs from "fs/promises";
import { readAndParse } from "../utils";
import { OutOfRangeError } from "../../errors/OutOfRangeError";

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
    const validateId = data.bots.find((i) => i.id === Number(bot.id));
    if (validateId) {
      throw new OutOfRangeError("Ya existe un bot con ese id, ponle otro");
    }
    data.bots.push(bot);
    return fs.writeFile(this.url, JSON.stringify(data, null, 2));
  }

  async updateBot(id, datos) {
    const data = await readAndParse(this.url);
    const botIndex = data.bots.findIndex((d) => d.id === id);
    if (botIndex > -1) {
      data.bots[botIndex] = { ...data.bots[botIndex], ...datos };
    }
    return fs.writeFile(this.url, JSON.stringify(data, null, 2));
  }

  async deleteBot(id) {
    const data = await readAndParse(this.url);
    const withDelete = data.bots.filter((f) => f.id !== Number(id));
    data.bots = withDelete;
    return fs.writeFile(this.url, JSON.stringify(data, null, 2));
  }
}

export { BotRepository };
