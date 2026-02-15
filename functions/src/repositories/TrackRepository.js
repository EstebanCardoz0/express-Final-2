import fs from "fs/promises";
import { readAndParse } from "../utils";
class TrackRepository {
  url = "./functions/src/repositories/league.json";

  async getTrackById(id) {
    return (await readAndParse(this.url)).tracks.find((t) => t.id === Number(id));
  }

  async createTrack(track) {
    const data = (await readAndParse(this.url));
    data.tracks.push(track);
    return fs.writeFile(this.url, JSON.stringify(data,null, 2));
  }
}

export { TrackRepository };
