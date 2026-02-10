class Bot {
  id;
  name;
  generation;
  processing;
  memory;
  battery;
  load;
  xp;
  rank;
  modules;
  baseCapacity;

  constructor(id, name, generation, processing, memory) {
    this.id = id;
    this.name = name;
    this.generation = generation;
    this.processing = processing;
    this.memory = memory;
    this.battery = 100;
    this.load = 0;
    this.xp = 0;
    this.rank = 1;
    this.modules = [];
    this.baseCapacity = proccesing * 0.6 + memory * 0.4;
  }
}

export { Bot };
