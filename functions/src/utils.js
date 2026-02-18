import fs from "fs/promises";

function contador() {
  let cont = 0;

  return {
    aumentar() {
      cont++;
    },
    valorActual() {
      return cont;
    },
  };
}

function acumulador(valorInicial = 0) {
  let total = valorInicial;
  return {
    acumular(valor) {
      return (total += valor);
    },
    obtenerTotal() {
      return total;
    },
    reset() {
      total = valorInicial;
    },
  };
}

const saveLog = async (log) => {
  const timeStamp = new Date().toISOString();
  await fs.appendFile("logger.txt", timeStamp + " - " + log + "\n");
};

const readAndParse = async (url) => {
  return JSON.parse(await fs.readFile(url));
};


const updateRank = (bot) => {
  let xpNecesaria = 50 + bot.rank ** 2 * 10;
  
  while (bot.xp >= xpNecesaria) {
    bot.rank++;
    bot.xp -= xpNecesaria;
    xpNecesaria = 50 + bot.rank ** 2 * 10;
  }
};


export { contador, acumulador, saveLog, readAndParse, updateRank, };
