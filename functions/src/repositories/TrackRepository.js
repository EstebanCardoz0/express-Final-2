import fs from "fs/promises";
import { readAndParse } from "../utils.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
class TrackRepository {
  url = "./functions/src/repositories/league.json";

  async getAllTracks() {

    return (await readAndParse(this.url)).tracks;
  }

  async getTrackById(id) {
    return (await readAndParse(this.url)).tracks.find(
      (t) => t.id === Number(id),
    );
  }

  async createTrack(track) {
    const data = await readAndParse(this.url);
    const validateId = data.tracks.find((i) => i.id === Number(track.id));
    if (validateId) {
      throw new OutOfRangeError("Id ya existente, pruebe con otro");
    }
    data.tracks.push(track);
    return fs.writeFile(this.url, JSON.stringify(data, null, 2));
  }
}

export { TrackRepository };
