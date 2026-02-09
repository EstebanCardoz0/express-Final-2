import { getLeagues } from "../services/leagueService.js";


const getAllLeagues = async (req, res) => {
  const data = await getLeagues();
  res.send(data);

}

export { getAllLeagues, };