import React, { useState } from "react";
import { useData } from "../services/DataAPI";
import { insertChampionByName } from "../services/UserService";

export function SmashOrPass() {
  const { allChampions } = useData();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [stats, setStats] = useState({ smash: 0, pass: 0 });

  if (!allChampions || allChampions.length === 0) {
    return <p>Loading champions...</p>;
  }

  const { name: championName, img: championImg } = allChampions[index];

  async function handleChoice(type) {
    if (loading) return;
    setLoading(true);
    setChosen(type);

    try {
      const updatedStats = await insertChampionByName({ name: championName }, type);
      setStats(updatedStats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function nextChampion() {
    setChosen(null);
    setIndex((prevIndex) => (prevIndex + 1) % allChampions.length);
  }

  function getPercentage(value, total) {
    return total === 0 ? 0 : Math.round((value / total) * 100);
  }

  return (
    <div className="smash-or-pass-page">
      <h1>Smash or Pass</h1>

      <div className="champion-choice">
        <img src={championImg} alt={championName} />
        <h2>{championName}</h2>
      </div>

      <div className="action">
        {!chosen ? (
          <>
            <button id="smash" onClick={() => handleChoice("Smash")} disabled={loading}>
              {loading ? "Loading..." : "Smash"}
            </button>
            <button id="pass" onClick={() => handleChoice("Pass")} disabled={loading}>
              {loading ? "Loading..." : "Pass"}
            </button>
          </>
        ) : (
          <div>
            <p>Smashed by {getPercentage(stats.smash, stats.smash + stats.pass)}% of users</p>
          </div>
        )}
      </div>

      {chosen && (
        <button id="next" onClick={nextChampion}>
          Next
        </button>
      )}
    </div>
  );
}
