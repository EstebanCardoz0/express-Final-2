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
    
    const bot = new Bot(botData.id, botData.name, botData.generation, botData.processing, botData.memory);
    bot.battery = botData.battery;
    bot.load = botData.load;
    bot.xp = botData.xp;
    bot.modules = botData.modules;
    bot.baseCapacity = botData.baseCapacity;
    
    return bot;
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
    }
    return fs.writeFile(this.url, JSON.stringify(data));
  }

  async deleteBot(id) {
    const data = await this.readAndParse();
    const withDelete = data.bots.filter((f) => f.id !== Number(id));
    data.bots = withDelete;
    return fs.writeFile(this.url, JSON.stringify(data));
  }
}

export { BotRepository };
