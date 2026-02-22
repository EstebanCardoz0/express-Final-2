import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { TrainingRepository } from "../repositories/TrainingRepository.js";
import { BotService } from "./BotService.js";
import { TrackService } from "./TrackService.js";
import { readAndParse } from "../utils.js";

class TrainingService {
  constructor(
    trainingRepo = new TrainingRepository(),
    trackServi = new TrackService(),
    botServi = new BotService(),
  ) {
    this.trainingRepo = trainingRepo;
    this.botServi = botServi;
    this.trackServi = trackServi;
  }

  async trainBot(trackId, botId) {
    const track = await this.trackServi.getTrackById(trackId);
    const bot = await this.botServi.getBotById(botId);

    let energyCost =
      track.energyCostBase +
      track.complexity * 2 +
      Math.floor(track.length / 50);

    if (bot.processing < track.processingDemand) {
      const extraPenalty = (track.processingDemand - bot.processing) / 5;
      energyCost += extraPenalty;
    }

    if (bot.battery < energyCost) {
      throw new OutOfRangeError(
        "EL bot no tiene la suficiente energía para este training",
      );
    }

    let xpBase = track.complexity * 10 + Math.floor(track.length / 20);
    let xpFinal = xpBase;
    if (
      bot.processing >= track.processingDemand &&
      bot.memory >= track.processingDemand
    ) {
      xpFinal = Math.floor(xpBase * 1.2);
    }

    this.botServi.addXpAndUpdateRank(bot, xpFinal);
    bot.battery -= energyCost;
    
    await this.botServi.updateBot(bot.id, {
      battery: bot.battery,
      xp: bot.xp,
      rank: bot.rank,
    });

    // Generar id automáticamente
    const trainings = (await this.trainingRepo.getAllTrainings?.())
      || (await readAndParse(this.trainingRepo.url)).trainings;
    const { getNextId } = await import("../utils.js");
    const nextId = getNextId(trainings);

    const training = {
      id: nextId,
      botId: botId,
      trackId: trackId,
      energyUsed: energyCost,
      xpGained: xpFinal,
    };
    return await this.trainingRepo.createTraining(training);
  }
}

export { TrainingService };
