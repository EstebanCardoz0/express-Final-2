import express from 'express'
import { router } from './src/routes/botRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/bots", router);

app.listen(PORT, () => {
  console.log("server corriendo")
});



