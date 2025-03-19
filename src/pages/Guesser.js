import React, { useState } from "react";
import { useData } from "../services/Data";

export function Guesser() {
  const { randomChampion, allChampions, loading, error } = useData();
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [nameOptions, setNameOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(
    parseInt(localStorage.getItem("totalAttempts") || 0)
  );
  const [correctAnswers, setCorrectAnswers] = useState(
    parseInt(localStorage.getItem("correctAnswers") || 0)
  );

  const getRandomNames = (correctName) => {
    const shuffled = allChampions
      .filter((c) => c.name !== correctName)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((c) => c.name);
    return [...shuffled, correctName].sort(() => 0.5 - Math.random());
  };

  const handleEasyClick = () => {
    setSelectedChampion(randomChampion);
    setNameOptions(getRandomNames(randomChampion.name));
    setShowOptions(false);
  };

  const checkChampion = (name) => {
    if (!selectedChampion) return;

    setTotalAttempts((prev) => {
      const newTotal = prev + 1;
      localStorage.setItem("totalAttempts", newTotal);
      return newTotal;
    });

    if (name === selectedChampion.name) {
      setIsCorrect(true);
      setCorrectAnswers((prev) => {
        const newCorrect = prev + 1;
        localStorage.setItem("correctAnswers", newCorrect);
        let btnChampions = document.querySelectorAll(".name-options button");
        btnChampions.forEach((btn) => {
          btn.disabled = true;
        });
        return newCorrect;
      });
      setStreak((prev) => prev + 1);
    } else {
      setIsCorrect(false);
      setStreak(0);
    }
  };

  const handleNext = () => {
    setIsCorrect(null);
    setShowOptions(false);
    setSelectedChampion(null);
    
    setTimeout(() => {
      setSelectedChampion(randomChampion);
      setNameOptions(getRandomNames(randomChampion.name));
    }, 50);
  };
  

  const successRate =
    totalAttempts > 0 ? ((correctAnswers / totalAttempts) * 100).toFixed(1) : 0;

  return (
    <div className="guesser-page">
      <h1>Guesser</h1>

      {showOptions ? (
        <div className="difficulty">
          <img
            id="leblanc-img"
            src="/assets/champions/leblanc-2.png"
            alt="LeBlanc"
          />
          <p>Choose your difficulty</p>
          <button id="btn-difficulty" onClick={handleEasyClick}>
            Easy
          </button>
          <button id="btn-difficulty">Hard</button>
        </div>
      ) : selectedChampion ? (
        <div className="champions">
          <div className="stats">
            <p>🔥 Streak: {streak}</p>
            <p>🟢 Precision: {successRate}%</p>
          </div>
          <img src={selectedChampion.img} alt={selectedChampion.name} />
          <div className="name-options">
            {nameOptions.map((name) => (
              <button key={name} onClick={() => checkChampion(name)}>
                {name}
              </button>
            ))}
          </div>

          {isCorrect === true && (
            <div className="correct">
              <p>Correct !</p>
              <button onClick={handleNext}>Next</button>
            </div>
          )}

          {isCorrect === false && (
            <div className="retry">
              <p>Incorrect !</p>
              <button onClick={handleNext}>Retry</button>
            </div>
          )}
        </div>
      ) : null}

      {loading && <p>Loading champions...</p>}
      {error && <p>Error loading champions.</p>}
    </div>
  );
}
