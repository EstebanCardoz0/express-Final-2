import fs from "fs/promises";
import { readAndParse } from "../utils.js";
import { DuplicateError } from "../../errors/DuplicateError.js";

class LogicTestRepository {
  url = "./functions/src/repositories/league.json";

  async createLogicTest(logicTest) {
    const data = await readAndParse(this.url);
    const validate = await this.getLogicTestById(logicTest.id);
    if (validate) {
      throw new DuplicateError("Ya existe un logicTest con ese id");
    }
    data.logicTests.push(logicTest);
    await fs.writeFile(this.url, JSON.stringify(data, null, 2));
    return logicTest;
  }

  async getLogicTestById(id) {
    const data = await readAndParse(this.url);
    const log = data.logicTests.find((l) => l.id === Number(id));
    return log;
  }
}

export { LogicTestRepository };
