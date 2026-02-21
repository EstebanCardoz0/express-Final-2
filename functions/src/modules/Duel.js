class Duel {
  constructor(
    id,
    bot1Id,
    bot2Id,
    result,
    xpBot1,
    xpBot2,
    batteryBot1,
    batteryBot2,
    performanceBot1,
    performanceBot2,
  ) {
    this.id = id;
    this.bot1Id = bot1Id;
    this.bot2Id = bot2Id;
    this.result = result;
    this.xpBot1 = xpBot1;
    this.xpBot2 = xpBot2;
    this.batteryBot1 = batteryBot1;
    this.batteryBot2 = batteryBot2;
    this.performanceBot1 = performanceBot1;
    this.performanceBot2 = performanceBot2;
  }
}

export { Duel };
