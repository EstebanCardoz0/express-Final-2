class DuplicateError extends Error {

  constructor(msg= "El id ya existe") {
    super(msg) 
    this.name = "DuplicateError";
  }
}

export { DuplicateError };