import { TrackService } from "../services/TrackService.js";
import { TrainingService } from "../services/TrainingService.js";

class TrackController {
  constructor(
    trackServi = new TrackService(),
    trainServi = new TrainingService(),
  ) {
    this.trackServi = trackServi;
    this.trainServi = trainServi;
  }

  trainBot = async (req, res, next) => {
    try {
      const { trackId, botId } = req.params;
      const train = await this.trainServi.trainBot(trackId, botId);
      res.status(201).json(train);
    } catch (error) {
      next(error);
    }
  };

  createTrack = async (req, res, next) => {
    try {
      const { name, complexity, length, energyCostBase, processingDemand } =
        req.body;
      const ct = await this.trackServi.createTrack(
        name,
        complexity,
        length,
        energyCostBase,
        processingDemand,
      );
      res.status(201).json(ct);
    } catch (error) {
      next(error);
    }
  };

  getAllTracks = async (req, res, next) => {
    try {
      const gat = await this.trackServi.getAllTracks();
      res.status(200).json(gat);
    } catch (error) {
      next(error);
    }
  };

  getTrackById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const gti = await this.trackServi.getTrackById(id);
      res.status(200).json(gti);
    } catch (error) {
      next(error);
    }
  };
}

export { TrackController };
