class Track {
  id;
  name;
  complexity;
  length;
  energyCostBase;
  processingDemand;

  constructor(id, name, complexity, length, energyCostBase, processingDemand) {
    this.id = id;
    this.name = name;
    this.complexity = complexity;
    this.length = length;
    this.energyCostBase = energyCostBase;
    this.processingDemand = processingDemand;
  }
}

export { Track };
