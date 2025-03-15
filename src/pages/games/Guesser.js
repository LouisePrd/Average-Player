import React, { useState } from "react";
import { useData } from "../../services/Data";

export function Guesser() {
  const { randomChampion, allChampions, loading, error } = useData();
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [showOptions, setShowOptions] = useState(true);

  const getRandomNames = (correctName) => {
    const shuffled = allChampions.filter(c => c.name !== correctName)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(c => c.name);
    return [...shuffled, correctName].sort(() => 0.5 - Math.random());
  };

  const handleEasyClick = () => {
    setSelectedChampion(randomChampion);
    setShowOptions(false);
  };

  return (
    <div className="guesser-page">
      <h1>Guesser</h1>
      {showOptions ? (
        <div className="difficulty">
          <p>Choose your difficulty:</p>
          <button onClick={handleEasyClick}>Easy</button>
          <button>Medium</button>
          <button>Hard</button>
        </div>
      ) : (
        selectedChampion && (
          <div className="champions">
            <img src={selectedChampion.img} alt={selectedChampion.name} />
            <div className="name-options">
              {getRandomNames(selectedChampion.name).map((name, index) => (
                <button key={index}>{name}</button>
              ))}
            </div>
            <button>Submit</button>
          </div>
        )
      )}
      {loading && <p>Loading champions...</p>}
      {error && <p>Error loading champions.</p>}
    </div>
  );
}
