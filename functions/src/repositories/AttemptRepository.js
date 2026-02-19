import { DuplicateError } from "../../errors/DuplicateError.js";
import { readAndParse } from "../utils.js";
import fs from "fs/promises";

class AttemptRepository {
  url = "./functions/src/repositories/league.json";

  async getAttemptsById(id) {
    const data = await readAndParse(this.url);
    const atte = await data.attempts.find((a) => a.id === Number(id));
    return atte;
  }

  async createAttempts(attempt) {
    const data = await readAndParse(this.url);
    const validate = await this.getAttemptsById(attempt.id);
    if (validate) {
      throw new DuplicateError("Ya existe attempt con ese id");
    }
    data.attempts.push(attempt);
    await fs.writeFile(this.url, JSON.stringify(data, null, 2));
    return attempt;
  }
}

export { AttemptRepository };
