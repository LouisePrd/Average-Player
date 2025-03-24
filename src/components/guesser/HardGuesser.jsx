import React, { useState, useCallback, useRef } from "react";
import { saveGameResult } from "../../services/UserService";

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
  pseudo,
  difficulty,
  typeGame,
}) {
  const [inputName, setInputName] = useState("");
  const [hasAttempted, setHasAttempted] = useState(false);
  const hasSaved = useRef(false);

  const checkChampion = useCallback(() => {
    if (!selectedChampion || !inputName.trim()) return;

    setTotalAttempts((prev) => prev + 1);
    setHasAttempted(true);

    const isAnswerCorrect = inputName.trim().toLowerCase() === selectedChampion.name.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setCorrectAnswers((prev) => (isAnswerCorrect ? prev + 1 : prev));
    setStreak((prev) => (isAnswerCorrect ? prev + 1 : 0));

    if (isAnswerCorrect) {
      hasSaved.current = false;
    }
  }, [selectedChampion, inputName, setIsCorrect, setStreak, setTotalAttempts, setCorrectAnswers]);

  const saveGame = useCallback(() => {
    if (!hasSaved.current) {
      hasSaved.current = true;
      saveGameResult(pseudo, difficulty, correctAnswers, typeGame);
    }
  }, [pseudo, difficulty, correctAnswers, typeGame]);

  const leave = async () => {
    saveGame();
    window.location.href = "/";
  };

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

          <button id="submit" onClick={checkChampion} disabled={!inputName.trim() || isCorrect !== null}>
            Submit
          </button>
        </div>

        {hasAttempted && (
          <div className={isCorrect ? "result-correct" : "result-incorrect"}>
            {isCorrect ? "Correct!" : `Incorrect! The correct answer was ${selectedChampion.name}.`}
          </div>
        )}

        <div className="actions">
          <button
            id="submit"
            onClick={() => {
              handleNext();
              setInputName("");
              setHasAttempted(false);

              if (correctAnswers % 5 === 0 && correctAnswers !== 0) {
                saveGame();
              }

              hasSaved.current = false;
            }}
            disabled={!hasAttempted}
          >
            Next
          </button>
          <button id="leave" onClick={leave}>
            Leave and save
          </button>
        </div>
      </div>
    </div>
  );
}
