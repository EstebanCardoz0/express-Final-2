import { obtenerDatos } from "../repositories/leagueRepository.js";

const getLeaguet= async () => {
  return obtenerDatos();
}

export {getLeagues,}