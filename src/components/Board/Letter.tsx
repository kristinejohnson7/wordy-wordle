import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

interface LetterProps {
  letterPos: number;
  attemptVal: number;
}

export default function Letter({ letterPos, attemptVal }: LetterProps) {
  const contextValues = useContext(AppContext);
  if (!contextValues) throw new Error();
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    contextValues;

  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currentAttempt.attempt > attemptVal
      ? correct
        ? "correct"
        : almost
        ? "almost"
        : "error"
      : "";

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((disabledLetters) => ({
        ...disabledLetters,
        general: [...disabledLetters.general, letter],
      }));
    }
    if (letter !== "" && correct) {
      setDisabledLetters((disabledLetters) => ({
        ...disabledLetters,
        correct: [...disabledLetters.correct, letter],
      }));
    }
    if (letter !== "" && almost) {
      setDisabledLetters((disabledLetters) => ({
        ...disabledLetters,
        almost: [...disabledLetters.almost, letter],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttempt.attempt]);

  const [scale, setScale] = useState(false);

  useEffect(() => {
    if (letter) {
      setScale(true);

      setTimeout(() => {
        setScale(false);
      }, 100);
    }
  }, [letter]);

  return (
    <div className={`letter ${letterState} ${scale ? "scale" : null}`}>
      {letter}
    </div>
  );
}
