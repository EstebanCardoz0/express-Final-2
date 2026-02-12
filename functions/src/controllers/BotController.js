import { OutOfRangeError } from "../../errors/OutOfRangeError.js";
import { BotService } from "../services/botService.js";

class BotController {
  botSer = new BotService();

  createBot = async (req, res) => {
    try {
      const { name, generation, processing, memory, modules } = req.body;
      const newBot = await this.botSer.createBot(name, generation, processing, memory, modules);
      res.status(201).json(newBot);
    } catch (error) {
      if (error instanceof OutOfRangeError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "error del server" });

      }
    }
  }
}

export { BotController };
