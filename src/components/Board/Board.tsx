import React, { useContext, useState } from "react";
import Letter from "./Letter";
import "./Board.scss";
import { AppContext } from "../../App";

export default function Board() {
  const [rowError, setRow] = useState("row1");
  const contextValues = useContext(AppContext);
  if (!contextValues) throw new Error();
  const { wordError } = contextValues;

  const rows = [0, 1, 2, 3, 4, 5];
  const letters = [0, 1, 2, 3, 4];

  return (
    <div className={`board ${wordError ? "shakeError" : null}`}>
      {rows.map((row, index) => {
        return (
          <div
            className={`row ${
              wordError && rowError === `row${index}` ? "shakeError" : null
            }`}
            onKeyDown={() => setRow(`row${index}`)}
          >
            {letters.map((letter) => (
              <Letter letterPos={letter} attemptVal={row} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
