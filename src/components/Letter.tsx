import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

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
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return <div className={`letter ${letterState}`}>{letter}</div>;
}
