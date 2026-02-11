class EntityNotFoundError extends Error {

  constructor(msg) {
    super(msg);
    this.name = "EntityNotFound";
    Error.captureStackTrace(this, this.constructor); // Mejora el stack trace
  }

}

export { EntityNotFoundError };