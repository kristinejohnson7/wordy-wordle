import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./GameOver.scss";

export default function GameOver() {
  const contextValues = useContext(AppContext);

  if (!contextValues) return null;
  const { gameOver, correctWord, currentAttempt } = contextValues;

  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You Correctly Guessed" : "You failed"}</h3>
      <h1>Correct word: {correctWord} </h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}
