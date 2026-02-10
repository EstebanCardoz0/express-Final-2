class OutOfRangeError extends Error {
  constructor(msg = "El valor ingresado está fuera de los límites permitidos") {
    super(msg);
    this.name = "OutOfRangeError";
    Error.captureStackTrace(this, this.constructor); // Mejora el stack trace
  }
}

export { OutOfRangeError };
