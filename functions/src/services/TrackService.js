import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { Track } from "../modules/Track.js";
import { TrackRepository } from "../repositories/TrackRepository.js";

class TrackService {
  constructor(trackRepo = new TrackRepository()) {
    this.trackRepo = trackRepo;
  }

  async getAllTracks() {
    return await this.trackRepo.getAllTracks();
  }

  async getTrackById(id) {
    const track = await this.trackRepo.getTrackById(id);
    if (!track) {
      throw new EntityNotFoundError("Track no encontrado");
    }
    return track;
  }

  async createTrack(
    name,
    complexity,
    length,
    energyCostBase,
    processingDemand,
  ) {
    if (complexity < 1 || complexity > 10) {
      throw new OutOfRangeError(
        "error. La complexity debe tener un valor entre 1 y 10 inclusive",
      );
    }
    const tracks = await this.trackRepo.getAllTracks();
    const { getNextId } = await import("../utils.js");
    const nextId = getNextId(tracks);
    const nuevoTrack = new Track(
      nextId,
      name,
      complexity,
      length,
      energyCostBase,
      processingDemand,
    );
    return this.trackRepo.createTrack(nuevoTrack);
  }
}

export { TrackService };
