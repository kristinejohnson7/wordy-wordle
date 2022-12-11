import React, { useContext } from "react";
import { AppContext } from "../../App";
import deleteIcon from "../../assets/delete.svg";
import "./Key.scss";

export interface Props {
  keyVal: string;
  bigKey?: boolean | undefined;
  disabled?: boolean;
  almost?: boolean;
  correct?: boolean;
}

export default function Key({
  keyVal,
  bigKey,
  disabled,
  almost,
  correct,
}: Props) {
  const contextValues = useContext(AppContext);

  if (!contextValues) return null;
  const { onEnter, onDelete, onSelectLetter } = contextValues;

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div
      className={`key ${bigKey ? "big" : disabled && "disabled"}
      ${(correct && "correct") || (almost && "almost")}
      `}
      onClick={selectLetter}
    >
      {keyVal === "DELETE" ? (
        <img src={deleteIcon} alt="delete icon" />
      ) : (
        keyVal
      )}
    </div>
  );
}
