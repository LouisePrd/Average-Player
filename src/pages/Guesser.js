import React, { useState, useEffect } from "react";
import { useData } from "../services/Data";
import { EasyGuesser } from "../components/guesser/EasyGuesser";
import { HardGuesser } from "../components/guesser/HardGuesser";
import "../styles/guesser.css";

export function Guesser() {
  const { randomChampion, allChampions, loading, error } = useData();
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [nameOptions, setNameOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const [difficulty, setDifficulty] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(() =>
    parseInt(localStorage.getItem("totalAttempts") || 0)
  );
  const [correctAnswers, setCorrectAnswers] = useState(() =>
    parseInt(localStorage.getItem("correctAnswers") || 0)
  );

  useEffect(() => {
    localStorage.setItem("totalAttempts", totalAttempts);
    localStorage.setItem("correctAnswers", correctAnswers);
  }, [totalAttempts, correctAnswers]);

  const getRandomNames = (correctName) => {
    if (!allChampions || allChampions.length < 3) return [correctName];

    const shuffled = allChampions
      .filter((c) => c.name !== correctName)
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(2, allChampions.length - 1))
      .map((c) => c.name);

    return [...shuffled, correctName].sort(() => Math.random() - 0.5);
  };

  const startGame = (mode) => {
    if (!randomChampion) return;
    setDifficulty(mode);
    setSelectedChampion(randomChampion);
    setNameOptions(getRandomNames(randomChampion.name));
    setShowOptions(false);
  };

  const handleNext = () => {
    setIsCorrect(null);
    const newChampion =
      allChampions[Math.floor(Math.random() * allChampions.length)];
    setSelectedChampion(newChampion);
    setNameOptions(getRandomNames(newChampion?.name));
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
          <button id="btn-difficulty" onClick={() => startGame("easy")}>
            Easy
          </button>
          <button id="btn-difficulty" onClick={() => startGame("hard")}>
            Hard
          </button>
        </div>
      ) : (
        selectedChampion && (
          <div className="champions">
            <div className="stats">
              <p>🔥 Streak: {streak}</p>
              <p>Precision: {successRate}%</p>
            </div>
            {difficulty === "easy" && (
              <EasyGuesser
                selectedChampion={selectedChampion}
                nameOptions={nameOptions}
                isCorrect={isCorrect}
                setIsCorrect={setIsCorrect}
                streak={streak}
                setStreak={setStreak}
                totalAttempts={totalAttempts}
                setTotalAttempts={setTotalAttempts}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
                handleNext={handleNext}
              />
            )}
            {difficulty === "hard" && (
              <HardGuesser
                selectedChampion={selectedChampion}
                isCorrect={isCorrect}
                setIsCorrect={setIsCorrect}
                streak={streak}
                setStreak={setStreak}
                totalAttempts={totalAttempts}
                setTotalAttempts={setTotalAttempts}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
                handleNext={handleNext}
              />
            )}
          </div>
        )
      )}

      {loading && <p>Loading champions...</p>}
      {error && <p>Error loading champions.</p>}
    </div>
  );
}
