import React, { useState, useEffect, useContext } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { randomParagraphGenerator } from "../utils/Api.js";
import { Button } from "./ui/button.jsx";
import UseTimer from "../hooks/UseTimer.js";
import { TypingContext } from "../context/TypingContext.jsx";
import ShowResult from "./ShowResult.jsx";
import SlidingParagraph from "./slidingParagraph.jsx";

const TypingBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [characterArray, setCharacterArray] = useState([]);
  const [linesArray, setLinesArray] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const { currentIdx, setCurrentIdx } = useContext(TypingContext);
  const { hasStarted, setHasStarted } = useContext(TypingContext);
  const { seconds, startTimer, resetTimer } = UseTimer();

  const [isFinished, setIsFinished] = useState(false);

  // Restart Logic
  const restartTest = () => {
    randomParagraphGenerator().then((text) => {
      const words = text.split(" ");
      const lines = [];
      for (let i = 0; i < words.length; i += 10) {
        lines.push(words.slice(i, i + 10).join(" "));
      }
      const characters = text.split("").map((ch) => ({
        char: ch,
        status: "not-typed",
      }));
      setCharacterArray(characters);
      setLinesArray(lines);
      setCurrentLineIndex(0);
      setCurrentIdx(0);
      setHasStarted(false);
      setIsFinished(false);
      setInputValue("");
      resetTimer();
    });
  };

  // Load paragraph on first render
  useEffect(() => {
    restartTest();
  }, []);

  // Finish test condition
  useEffect(() => {
    if (
      hasStarted &&
      ((seconds === 0) || (currentIdx === characterArray.length))
    ) {
      setIsFinished(true);
    }
  }, [seconds, hasStarted, characterArray.length, currentIdx]);

  // Typing logic
  const handleInput = (e) => {
    const key = e.key;

    if (!hasStarted && key.length === 1) {
      setHasStarted(true);
      startTimer();
    }

    if (key === "Backspace" && currentIdx > 0) {
      const updatedArray = [...characterArray];
      updatedArray[currentIdx - 1].status = "not-typed";
      setCharacterArray(updatedArray);
      setCurrentIdx((prev) => prev - 1);
      return;
    }

    if (currentIdx < characterArray.length && key.length === 1) {
      const updatedArray = [...characterArray];

      if (key === characterArray[currentIdx].char) {
        updatedArray[currentIdx].status = "correct";
      } else {
        updatedArray[currentIdx].status = "incorrect";
      }

      setCharacterArray(updatedArray);
      setCurrentIdx((prev) => prev + 1);

      // Sliding trigger: when second line is finished
      const charsBeforeSecondLine =
        linesArray.slice(0, currentLineIndex + 2).join(" ").length +
        (currentLineIndex + 2 > 0 ? 1 : 0);

      if (currentIdx + 1 === charsBeforeSecondLine) {
        setCurrentLineIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="bg-gray-800 w-full flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Typing Speed Test</h1>

      {isFinished ? (
        <ShowResult
          charArray={characterArray}
          totalTime={seconds}
          onRestart={restartTest}
        />
      ) : (
        <>
          <h2 className="text-xl mb-3 font-bold text-gray-300">
            Time Left : {seconds}s
          </h2>

          <div className="w-full max-w-6xl p-4 mb-6">
            <SlidingParagraph
              characterArray={characterArray}
              linesArray={linesArray}
              currentLineIndex={currentLineIndex}
            />
          </div>

          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInput}
            disabled={seconds === 0}
            placeholder="Start typing here..."
            className="border-2 border-gray-300 focus:border-blue-500 outline-none p-3 rounded-lg w-96 text-lg text-gray-500 shadow-sm"
          />


          <div className="mt-4">
            <Button
              onClick={restartTest}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <VscDebugRestart size={20} />
              Restart Test
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TypingBox;