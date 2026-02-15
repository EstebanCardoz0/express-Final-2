import fs from "fs/promises";
import { readAndParse } from "../utils.js";
import { Bot } from "../modules/Bot.js";

class BotRepository {
  url = "./functions/src/repositories/league.json";

  async readAndParse() {
    return await readAndParse(this.url);
  }

  getBotById = async (id) => {
    const data = await this.readAndParse();
    const botData = data.bots.find((d) => d.id === Number(id));
    if (!botData) return null;
    
    return Bot.fromData(botData);
  };

  async createBot(bot) {
    const data = await this.readAndParse();
    data.bots.push(bot);
    return fs.writeFile(this.url, JSON.stringify(data));
  }

  async updateBot(id, datos) {
    const data = await this.readAndParse();
    const botIndex = data.bots.findIndex((d) => d.id === Number(id));
    if (botIndex > -1) {
      data.bots[botIndex] = { ...data.bots[botIndex], ...datos };
      await fs.writeFile(this.url, JSON.stringify(data));
      return Bot.fromData(data.bots[botIndex]);
    }
    return null;
  }

  async deleteBot(id) {
    const data = await this.readAndParse();
    const withDelete = data.bots.filter((f) => f.id !== Number(id));
    data.bots = withDelete;
    return fs.writeFile(this.url, JSON.stringify(data));
  }
}

export { BotRepository };
