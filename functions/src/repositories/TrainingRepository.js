import fs from "fs/promises";
import { readAndParse } from "../utils.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";

class TrainingRepository {
  url = "./functions/src/repositories/league.json";

  async createTraining(training) {
    const data = await readAndParse(this.url);
    const validateId = await this.getTrainingById(training.id);
    if (validateId) {
      throw new OutOfRangeError("Ya existe un training con ese ID");
    }
    data.trainings.push(training);
    return fs.writeFile(this.url, JSON.stringify(data, null, 2));   
  }

  async getTrainingById(id) {
    const data = await readAndParse(this.url);
    const train = data.trainings.find((t) => t.id === Number(id));

    return train;
  }
}

export { TrainingRepository };
