import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { Track } from "../modules/Track.js";
import { TrackRepository } from "../repositories/TrackRepository.js";
import { contador } from "../utils.js";

class TrackService {
  constructor(trackRepo = new TrackRepository()) {
    this.trackRepo = trackRepo;
    this.contador = contador();
  }

  async getAllTracks() {
    return await this.trackRepo.getAllTracks();
  }

  async getTrackById(id) {
    const track = this.trackRepo.getTrackById(id);
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
    this.contador.aumentar();
    const nuevoTrack = new Track(
      this.contador.valorActual(),
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
