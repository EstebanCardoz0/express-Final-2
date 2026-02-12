import fs from "fs/promises";

class BotRepository {

  url = './league.json';

  async readAndParse() {
    return JSON.parse(await fs.readFile(this.url));
  }

  getBotById = async (id) => {
    // const data = await fs.readFile(this.url);
    // const parse = JSON.parse(data);
    const data = await this.readAndParse();
    return data.bots.find(d => d.id === id);
  }

  async createBot(bot) {
    // const data = await fs.readFile(this.url);
    // const parse = JSON.parse(data);
    const data = await this.readAndParse();
    data.bots.push(bot);
    return fs.writeFile(this.url, JSON.stringify(data));
  }

  async updateBot(id, datos) {

    const data = await this.readAndParse();
    const botIndex = data.bots.findIndex(d => d.id === id);
    if (botIndex > -1) {
      data.bots[botIndex] = { ...data.bots[botIndex], ...datos };
    }
    return fs.writeFile(this.url, JSON.stringify(data));
  }

}

export { BotRepository, };

