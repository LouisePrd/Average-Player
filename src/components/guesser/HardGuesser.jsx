import React, { useState, useCallback } from "react";

export function HardGuesser({
  selectedChampion,
  isCorrect,
  setIsCorrect,
  streak,
  setStreak,
  totalAttempts,
  setTotalAttempts,
  correctAnswers,
  setCorrectAnswers,
  handleNext,
}) {
  const [inputName, setInputName] = useState("");
  const [hasAttempted, setHasAttempted] = useState(false);

  const checkChampion = useCallback(() => {
    if (!selectedChampion || !inputName.trim()) return;

    setTotalAttempts((prev) => prev + 1);
    setHasAttempted(true);

    if (
      inputName.trim().toLowerCase() === selectedChampion.name.toLowerCase()
    ) {
      setIsCorrect(true);
      setCorrectAnswers((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setIsCorrect(false);
      setStreak(0);
    }
  }, [
    selectedChampion,
    inputName,
    setIsCorrect,
    setStreak,
    setTotalAttempts,
    setCorrectAnswers,
  ]);

  return (
    <div className="hard-guesser">
      <div className="hard-guesser-card">
        <img src={selectedChampion.img} alt={selectedChampion.name} />

        <div className="input-name">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            disabled={isCorrect !== null}
            placeholder="Enter champion name..."
          />

          <button
            id="submit"
            onClick={checkChampion}
            disabled={!inputName.trim() || isCorrect !== null}
          >
            Submit
          </button>
        </div>

        {hasAttempted && (
          <div className={isCorrect ? "result-correct" : "result-incorrect"}>
            {isCorrect
              ? "Correct!"
              : `Incorrect! The correct answer was ${selectedChampion.name}.`}
          </div>
        )}

        <button
          id="submit"
          onClick={() => {
            handleNext();
            setInputName("");
            setHasAttempted(false);
          }}
          disabled={!hasAttempted}
        >
          Next
        </button>
      </div>
    </div>
  );
}
