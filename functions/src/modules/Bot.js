class Bot {
  id;
  name;
  generation;
  processing;
  memory;
  battery;
  load;
  xp;
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
    this.modules = [];
    this.baseCapacity = processing * 0.6 + memory * 0.4;
  }

  get rank() {
    if (this.xp < 100) return 1;
    if (this.xp < 300) return 2;
    if (this.xp < 600) return 3;
    if (this.xp < 1000) return 4;
    if (this.xp < 1500) return 5;
    if (this.xp < 2100) return 6;
    if (this.xp < 2800) return 7;
    if (this.xp < 3600) return 8;
    if (this.xp < 4500) return 9;
    return 10;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      generation: this.generation,
      processing: this.processing,
      memory: this.memory,
      battery: this.battery,
      load: this.load,
      xp: this.xp,
      rank: this.rank,
      modules: this.modules,
      baseCapacity: this.baseCapacity
    };
  }
}

export { Bot };
