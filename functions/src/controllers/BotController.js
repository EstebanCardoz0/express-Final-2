import { BotService } from "../services/BotService.js";

class BotController {
  constructor(botSer = new BotService()) {
    this.botSer = botSer;
  }
  createBot = async (req, res, next) => {
    try {
      const { name, generation, processing, memory, modules } = req.body;
      const newBot = await this.botSer.createBot(
        name,
        generation,
        processing,
        memory,
        modules,
      );
      res.status(201).json(newBot);
    } catch (error) {
      next(error);
    }
  };

  getBotById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const boti = await this.botSer.getBotById(id);
      res.status(200).json(boti);
    } catch (error) {
      next(error);
    }
  };

  updateBot = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, generation, processing, memory, modules } = req.body;
      const nBot = await this.botSer.updateBot(id, {
        name,
        generation,
        processing,
        memory,
        modules,
      });

      res.status(200).json(nBot);
    } catch (error) {
      next(error);
    }
  };
}

export { BotController };
