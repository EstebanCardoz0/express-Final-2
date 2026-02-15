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
      const updates = {};
      
      if (req.body.name !== undefined) updates.name = req.body.name;
      if (req.body.generation !== undefined) updates.generation = req.body.generation;
      if (req.body.processing !== undefined) updates.processing = req.body.processing;
      if (req.body.memory !== undefined) updates.memory = req.body.memory;
      if (req.body.modules !== undefined) updates.modules = req.body.modules;
      if (req.body.xp !== undefined) updates.xp = req.body.xp;
      if (req.body.battery !== undefined) updates.battery = req.body.battery;
      if (req.body.load !== undefined) updates.load = req.body.load;
      
      const nBot = await this.botSer.updateBot(id, updates);

      res.status(200).json(nBot);
    } catch (error) {
      next(error);
    }
  };

  deleteBot = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.botSer.deleteBot(id);
      res.status(204).json() ;
    } catch (error) {
      next(error);
    }
  };
}

export { BotController };
