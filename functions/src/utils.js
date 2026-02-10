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

export { contador };

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

export { contador, acumulador };
