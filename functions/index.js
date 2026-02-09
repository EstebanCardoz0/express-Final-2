import express from 'express'
import { getAllLeagues } from './src/modules/league.js';

const app = express();
const PORT = 3000;


app.get("/", getAllLeagues);

app.listen(PORT, () => {
  console.log("server correndo")
});



