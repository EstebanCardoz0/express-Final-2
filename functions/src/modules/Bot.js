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
  }

  get baseCapacity() {
    return this.processing * 0.6 + this.memory * 0.4;
  }


}

export { Bot };
