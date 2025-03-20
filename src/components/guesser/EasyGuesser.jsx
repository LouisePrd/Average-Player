import React, { useState, useCallback } from "react";

export function EasyGuesser({
  selectedChampion,
  nameOptions,
  isCorrect,
  setIsCorrect,
  streak,
  setStreak,
  totalAttempts,
  setTotalAttempts,
  correctAnswers,
  setCorrectAnswers,
  handleNext
}) {
  const [selectedName, setSelectedName] = useState(null);

  const checkChampion = useCallback((name) => {
    if (!selectedChampion) return;
    

    setSelectedName(name);
    setTotalAttempts(prev => prev + 1);

    if (name.trim().toLowerCase() === selectedChampion.name.trim().toLowerCase()) {
      setIsCorrect(true);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setIsCorrect(false);
      setStreak(0);
    }
  }, [selectedChampion, setIsCorrect, setStreak, setTotalAttempts, setCorrectAnswers]);

  return (
    <div className="easy-guesser">
      <div className="easy-guesser-card">
        <img src={selectedChampion.img} alt={selectedChampion.name} />

        <div className="name-options">
          {nameOptions.map((name) => (
            <button
              key={name}
              onClick={() => checkChampion(name)}
              disabled={isCorrect !== null}
              className={
                isCorrect !== null
                  ? name === selectedChampion.name
                    ? "correct"
                    : name === selectedName
                      ? "incorrect"
                      : ""
                  : ""
              }
            >
              {name}
            </button>
          ))}
        </div>

        <div className="easy-guesser-results">
          {isCorrect !== null && (
            <div className={isCorrect ? "result-correct" : "result-incorrect"}>
              {isCorrect ? "Correct, again ?" : `Incorrect, it was ${selectedChampion.name}.`}
            </div>
          )}
          <button id="submit" onClick={handleNext} disabled={isCorrect === null}>Next</button>
        </div>
      </div>
    </div>
  );
}
