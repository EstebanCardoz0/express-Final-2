class LogicTest {
  id;
  title;
  difficulty;
  timeLimit;
  baseRewardFormula;
  penaltyFormula;

  constructor(
    id,
    title,
    difficulty,
    timeLimit,
    baseRewardFormula,
    penaltyFormula,
  ) {
    this.id=id;
    this.title = title;
    this.difficulty = difficulty;
    this.timeLimit = timeLimit;
    this.baseRewardFormula = baseRewardFormula;
    this.penaltyFormula = penaltyFormula;
  }
}

export { LogicTest };
