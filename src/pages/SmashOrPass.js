import React, { useState, useEffect } from "react";
import { useData } from "../services/DataAPI";
import { NextBtn } from "../components/buttons/NextBtn";
import { insertChampionByName } from "../services/UserService";

export function SmashOrPass() {
  const { allChampions } = useData();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [stats, setStats] = useState({ smash: 0, pass: 0 });

  // Pour éviter de recommencer au début de la liste à chaque rechargement
  useEffect(() => {
    const savedIndex = localStorage.getItem("championIndex");
    if (savedIndex !== null) {
      setIndex(parseInt(savedIndex, 10));
    }
  }, []);

  if (!allChampions || allChampions.length === 0) {
    return <p>Loading champions...</p>;
  }

  const { name: championName, img: championImg } = allChampions[index];

  async function handleChoice(type) {
    if (loading) return;
    setLoading(true);
    setChosen(type);

    try {
      const updatedStats = await insertChampionByName(
        { name: championName },
        type
      );
      setStats(updatedStats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function nextChampion() {
    setChosen(null);
    const newIndex = (index + 1) % allChampions.length;
    localStorage.setItem("championIndex", newIndex);
    setIndex(newIndex);
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
            <button
              id="smash"
              onClick={() => handleChoice("Smash")}
              disabled={loading}
            >
              {loading ? "Loading..." : "Smash"}
            </button>
            <button
              id="pass"
              onClick={() => handleChoice("Pass")}
              disabled={loading}
            >
              {loading ? "Loading..." : "Pass"}
            </button>
          </>
        ) : (
          <div>
            {loading ? (
              <p>Updating stats...</p>
            ) : (
              <p>
                Smashed by{" "}
                {getPercentage(stats.smash, stats.smash + stats.pass)}% of users
              </p>
            )}
          </div>
        )}
      </div>

      {chosen && !loading && <NextBtn onClick={nextChampion} />}
    </div>
  );
}
