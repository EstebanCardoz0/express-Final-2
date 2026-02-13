import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { BotService } from "../services/BotService.js";

class BotController {
  constructor(botSer = new BotService()) {
    this.botSer = botSer;
  }
  createBot = async (req, res) => {
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
      if (error instanceof OutOfRangeError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "error del server" });
      }
    }
  };

  getBotById = async (req, res) => {
    try {
      const { id } = req.params;
      const boti = await this.botSer.getBotById(id);
      res.status(200).json(boti);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "error del server" });
      }
    }
  };

  updateBot = async (req, res) => {
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
      if (error instanceof EntityNotFoundError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof OutOfRangeError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error del server" });
      }
    }
  };
}

export { BotController };
