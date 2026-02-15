import express from "express";
import { router } from "./src/routes/botRoutes.js";
import { saveLog } from "./src/utils.js";
import { EntityNotFoundError } from "./errors/EntityNotFoundError.js";
import { OutOfRangeError } from "./errors/OutOfRangeError.js";

const app = express();
const PORT = 3000;

const loggerMiddleware = async (req, res, next) => {
  await saveLog(`${req.method} ${req.url}`);
  next();
};

app.use(loggerMiddleware);

app.use(express.json());
app.use("/bots", router);

const errorHandler = async (err, req, res, next) => {
  await saveLog(`${err}`);
  if (err instanceof EntityNotFoundError) {
    res.status(404).json({ error: err.message });
  } else if (err instanceof OutOfRangeError) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Error del server" });
  }
};

app.use(errorHandler);

app.listen(PORT, () => {});
