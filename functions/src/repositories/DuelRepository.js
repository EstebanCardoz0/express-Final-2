import fs from "fs/promises";
import { readAndParse } from "../utils.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { Duel } from "../modules/Duel.js";

class DuelRepository {
  url = "./functions/src/repositories/league.json";

  async getAllDuels() {
    return (await readAndParse(this.url)).duels;
  }

  async getDuelById(id) {
    const data = await readAndParse(this.url);
    const duel = data.duels.find((d) => d.id === Number(id));
    return duel;
  }

  async createDuel(duel) {
    const data = await readAndParse(this.url);
    const validate = await this.getDuelById(duel.id);
    if (validate) {
      throw new DuplicateError("Ya existe un duelo con ese ID");
    }
    data.duels.push(duel);
    await fs.writeFile(this.url, JSON.stringify(data, null, 2));
    return duel;
  }
}

export { DuelRepository };
