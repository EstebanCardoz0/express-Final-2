import { obtenerDatos } from "../repositories/leagueRepository.js";

const getLeagues = async () => {
  return obtenerDatos();
}

export {getLeagues,}