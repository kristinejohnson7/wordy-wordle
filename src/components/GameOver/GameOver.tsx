import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./GameOver.scss";
import lose from "../../assets/fail.png";
import win from "../../assets/win.png";

export default function GameOver() {
  const contextValues = useContext(AppContext);

  if (!contextValues) return null;
  const { gameOver, correctWord, currentAttempt } = contextValues;

  console.log("youre in game over");

  return (
    <div className="modal">
      <div>
        <h3>
          {gameOver.guessedWord ? "You did it!" : "Better luck next time!"}
        </h3>
        <img src={gameOver.guessedWord ? win : lose} alt="win or lose" />
        <h2>Correct word: {correctWord} </h2>
        {gameOver.guessedWord && (
          <h3>You guessed in {currentAttempt.attempt} attempts</h3>
        )}
      </div>
    </div>
  );
}
