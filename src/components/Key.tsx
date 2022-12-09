import React, { useContext } from "react";
import { AppContext } from "../App";

export interface Props {
  keyVal: string;
  bigKey?: boolean | undefined;
  disabled?: boolean;
}

export default function Key({ keyVal, bigKey, disabled }: Props) {
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
      className={`key ${bigKey ? "big" : disabled && "disabled"}`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}
