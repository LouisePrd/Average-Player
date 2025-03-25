import { useState, useEffect, useRef } from "react";
import { NextBtn } from "../buttons/NextBtn";
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
  const hasSaved = useRef(false);

  const checkChampion = (name) => {
    if (!championName) return;

    setSelectedName(name);
    setTotalAttempts((prev) => prev + 1);

    const isAnswerCorrect = name.trim().toLowerCase() === championName.trim().toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setStreak((prev) => (isAnswerCorrect ? prev + 1 : 0));
    setCorrectAnswers((prev) => (isAnswerCorrect ? prev + 1 : prev));

    if (isAnswerCorrect) {
      hasSaved.current = false;
    }
  };

  useEffect(() => {
    if (isCorrect && !hasSaved.current && correctAnswers % 5 === 0 && correctAnswers !== 0) {
      hasSaved.current = true;
      saveGameResult(pseudo, difficulty, correctAnswers, typeGame);
    }
  }, [isCorrect, pseudo, difficulty, correctAnswers, typeGame]);

  const handleNextQuestion = () => {
    setSelectedName(null);
    setIsCorrect(null);
    hasSaved.current = false;
    handleNext();
  };

  const leave = async () => {
    if (!hasSaved.current) {
      hasSaved.current = true;
      saveGameResult(pseudo, difficulty, correctAnswers, typeGame);
    }
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
            <NextBtn onClick={handleNextQuestion} />
            <button id="leave" onClick={leave}>
              Leave and save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}