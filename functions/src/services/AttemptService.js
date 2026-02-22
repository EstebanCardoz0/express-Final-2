import { EntityNotFoundError } from "../../errors/EntityNotFoundError.js";
import { AttemptRepository } from "../repositories/AttemptRepository.js";
import { BotService } from "./BotService.js";
import { LogicTestService } from "./LogicTestService.js";

class AttemptService {
  constructor(
    atteRepo = new AttemptRepository(),
    botServi = new BotService(),
    logicTestServi = new LogicTestService(),
  ) {
    this.atteRepo = atteRepo;
    this.botServi = botServi;
    this.logicTestServi = logicTestServi;
  }

  async getAttemptById(id) {
    const atte = await this.atteRepo.getAttemptById(id);
    if (!atte) {
      throw new EntityNotFoundError("No se econtró attempt con ese id");
    }
    return atte;
  }

  async createAttempt(botId, logicTestId, timeUsed) {
    const bot = await this.botServi.getBotById(botId);
    const logic = await this.logicTestServi.getLogicTestById(logicTestId);
    // Generar id único
    this.contador.aumentar();
    const id = this.contador.valorActual;

    // Objeto attempt simple según consigna
    let atte = { id, botId, logicTestId, result: null };

    // Validación de tiempo
    if (timeUsed > logic.timeLimit) {
      atte.result = "failed";
      return await this.atteRepo.createAttempt(atte);
    }

    // Validación de memoria
    if (bot.memory < (logic.difficulty * 10)) {
      atte.result = "failed";
      return await this.atteRepo.createAttempt(atte);
    }

    // Cálculo de penalización
    const penaltyBase = this.evalFormula(logic.penaltyFormula, {
      difficulty: logic.difficulty,
      timeUsed,
      timeLimit: logic.timeLimit
    });
    const ratio = timeUsed / logic.timeLimit;
    let penaltyTotal = penaltyBase;
    if (ratio > 0.8) penaltyTotal += logic.difficulty * 2;

    // Validación de batería
    if (bot.battery < penaltyTotal) {
      atte.result = "failed";
      return await this.atteRepo.createAttempt(atte);
    }

    // Si pasa todas las validaciones, es éxito
    atte.result = "success";
    return await this.atteRepo.createAttempt(atte);

  }


  evalFormula(formula, vars) {
    // Reemplaza cada variable por su valor en el string
    let str = formula;
    for (const key in vars) {
      // Solo reemplaza variables completas (no partes de palabras)
      str = str.replace(new RegExp(`\\b${key}\\b`, "g"), vars[key]);
    }
    // Evalúa operaciones matemáticas básicas de forma segura
    // Solo permite números, +, -, *, /, paréntesis y espacios
    if (!/^[\d+\-*/ ().]+$/.test(str)) {
      throw new Error("Fórmula inválida");
    }
    // eslint-disable-next-line no-new-func
    return Function(`"use strict";return (${str})`)();
  }
};

export { AttemptService };
