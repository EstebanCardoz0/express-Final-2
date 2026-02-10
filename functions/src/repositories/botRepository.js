import fs from "fs/promises";

class BotRepository {

  url = './league.json';

  constructor() {

  }

  getBotById = async (id) => {
    const data = await fs.readFile(this.url);
    const parse = JSON.parse(data);
    return parse.bots.find(d => d.id === id);
  }

  async createBot(bot) {
    const data = await fs.readFile(this.url);
    const parse = JSON.parse(data);
    parse.bots.push(bot);
    return fs.writeFile( this.url, JSON.stringify(parse) );
  }
}

export { BotRepository, };

