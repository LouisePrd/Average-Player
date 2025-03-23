import { useState, useEffect } from "react";
import { saveGameResult } from "../../services/UserService";

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
  handleNext,
  pseudo,
  difficulty,
  typeGame,
}) {
  const [selectedName, setSelectedName] = useState(null);
  const { name: championName, img: championImg } = selectedChampion || {};
  const [gameFinished, setGameFinished] = useState(false);

  const checkChampion = (name) => {
    if (!championName) return;

    setSelectedName(name);
    setTotalAttempts((prev) => prev + 1);

    const isAnswerCorrect = name.trim().toLowerCase() === championName.trim().toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setStreak((prev) => (isAnswerCorrect ? prev + 1 : 0));
    setCorrectAnswers((prev) => (isAnswerCorrect ? prev + 1 : prev));

    // Marquer la partie comme terminée si on veut sauvegarder à la fin du jeu
    if (isAnswerCorrect) {
      setGameFinished(true);
    }
  };

  useEffect(() => {
    if (gameFinished) {
      saveGameResult(pseudo, difficulty, correctAnswers, typeGame);
      setGameFinished(false); // Reset après sauvegarde
    }
  }, [gameFinished, pseudo, difficulty, correctAnswers, typeGame]);

  const leave = async () => {
    setGameFinished(true);
    window.location.href = "/";
  };

  return (
    <div className="easy-guesser">
      <div className="easy-guesser-card">
        <img src={championImg} alt={championName} />

        <div className="name-options">
          {nameOptions.map((name) => (
            <button
              key={name}
              onClick={() => checkChampion(name)}
              disabled={isCorrect !== null}
              className={
                isCorrect !== null
                  ? name === championName
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
              {isCorrect ? "Correct, again ?" : `Incorrect, it was ${championName}.`}
            </div>
          )}

          <div className="actions">
            <button id="submit" onClick={handleNext} disabled={isCorrect === null}>
              Next
            </button>
            <button id="leave" onClick={leave}>
              Leave and save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}