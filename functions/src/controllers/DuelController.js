import { DuelService } from "../services/DuelService.js";

class DuelController {
  constructor(duelSer = new DuelService()) {
    this.duelSer = duelSer;
  }

  getAllDuels = async (req, res, next) => {
    try {
      const getAll = await this.duelSer.getAllDuels();
      res.status(200).json(getAll);
    } catch (error) {
      next(error);
    }
  };

  getDuelById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const duel = await this.duelSer.getDuelById(id);
      res.status(200).json(duel);
    } catch (error) {
      next(error);
    }
  };

  createDuel = async (req, res, next) => {
    try {
      const { bot1Id, bot2Id } = req.body;
      const duel = await this.duelSer.createDuel(bot1Id, bot2Id);
      res.status(201).json(duel);
    } catch (error) {
      next(error);
    }
  };
}

export { DuelController };
