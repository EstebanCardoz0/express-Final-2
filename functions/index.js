import express from "express";
import { router } from "./src/routes/botRoutes.js";
import { saveLog } from "./src/utils.js";

const app = express();
const PORT = 3000;

const loggerMiddleware = async (req, res, next) => {
  await saveLog(`${req.method} ${req.url}`);
  next();
};

app.use(loggerMiddleware);

app.use(express.json());
app.use("/bots", router);

app.listen(PORT, () => {});
