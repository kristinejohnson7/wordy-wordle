import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import GameOver from "./components/GameOver/GameOver";
import Keyboard from "./components/KeyBoard/Keyboard";
import { boardDefault } from "./Words";
import { generateWordSet } from "./Words";
import Nav from "./components/Nav/Nav";

interface AppContextInterface {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  currentAttempt: { attempt: number; letterPos: number };
  setCurrentAttempt: React.Dispatch<
    React.SetStateAction<{
      attempt: number;
      letterPos: number;
    }>
  >;
  onSelectLetter: (keyVal: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  disabledLetters: {
    general: string[];
    almost: string[];
    correct: string[];
  };
  setDisabledLetters: React.Dispatch<
    React.SetStateAction<{
      general: string[];
      almost: string[];
      correct: string[];
    }>
  >;
  gameOver: {
    gameOver: boolean;
    guessedWord: boolean;
  };
  setGameOver: React.Dispatch<
    React.SetStateAction<{
      gameOver: boolean;
      guessedWord: boolean;
    }>
  >;
  correctWord: string;
  setCorrectWord: React.Dispatch<React.SetStateAction<string>>;
  wordError: boolean;
}

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState({
    general: [""],
    almost: [""],
    correct: [""],
  });
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");
  const [wordError, setWordError] = useState(false);

  useEffect(() => {
    generateWordSet().then((words) => {
      if (words.wordSet && words.todaysWord) {
        setWordSet(words.wordSet);
        setCorrectWord(words.todaysWord);
      }
    });
  }, []);

  const onSelectLetter = (keyVal: string) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
    } else {
      setWordError(true);
    }

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const contextValues: AppContextInterface = {
    board,
    setBoard,
    currentAttempt,
    setCurrentAttempt,
    onSelectLetter,
    onDelete,
    onEnter,
    correctWord,
    setCorrectWord,
    disabledLetters,
    setDisabledLetters,
    gameOver,
    setGameOver,
    wordError,
  };

  return (
    <div className="App">
      <Nav />
      <AppContext.Provider value={contextValues}>
        <div className="game">
          <div
            className={`alert alert-success wordError ${
              wordError ? "alert-shown" : "alert-hidden"
            }`}
            onTransitionEnd={() => setWordError(false)}
          >
            Not in word list
          </div>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
