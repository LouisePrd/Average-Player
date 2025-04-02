import { useState, useEffect } from "react";
import {
  getTopPlayers,
  getFiveLastEasyGames,
  getFiveLastHardGames,
} from "../services/UserService";
import "../styles/scoreboard.css";
import { ScoreTable } from "../components/ScoreTable";
import { ScoreTableHard } from "../components/ScoreTableDifficulty";
import { LoadingMessage } from "../components/utils/LoadingMessage";
import { ErrorMessage } from "../components/utils/ErrorMessage";

export function Scoreboard() {
  const [players, setPlayers] = useState([]);
  const [easyGames, setEasyGames] = useState([]);
  const [hardGames, setHardGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersData, easyData, hardData] = await Promise.all([
          getTopPlayers(),
          getFiveLastEasyGames(),
          getFiveLastHardGames(),
        ]);

        if (Array.isArray(playersData)) setPlayers(playersData);
        if (Array.isArray(easyData)) setEasyGames(easyData);
        if (Array.isArray(hardData)) setHardGames(hardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Scoreboard</h1>
      <div className="scoreboard">
        <h2 className="title-scores">Top players</h2>
        <ScoreTableHard players={players} />

        <h2 className="title-scores">Last easy games</h2>
        <ScoreTable players={easyGames} />

        <h2 className="title-scores">Last hard games</h2>
        <ScoreTable players={hardGames} />
      </div>
    </div>
  );
}
