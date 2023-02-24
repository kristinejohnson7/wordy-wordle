import wordBank from "./correctWords.txt";
import allowableWords from "./allowableWords.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet: any;
  let allowableSet: any;
  let todaysWord;
  let mergedSet;
  await fetch(wordBank)
    .then((response) =>
      response.text().then((result) => {
        const wordArr = result.split("\n");
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        wordSet = new Set(wordArr);
      })
    )
    .then(async () => {
      await fetch(allowableWords).then((response) =>
        response.text().then((result) => {
          const guessArr = result.split("\n");
          allowableSet = new Set(guessArr);
        })
      );
    })
    .then(() => {
      mergedSet = new Set([...allowableSet, ...wordSet]);
    });

  return { mergedSet, todaysWord };
};
