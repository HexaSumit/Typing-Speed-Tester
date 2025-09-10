import React, { useContext, useState } from 'react'
import TypingBox from '../components/TypingBox'
import Navbar from '../components/Navbar'
import { TypingContext } from '../context/TypingContext';
import { randomParagraphGenerator } from '../utils/Api';
import useTimer from '../hooks/useTimer.js';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [characterArray, setCharacterArray] = useState([]);
  const [linesArray, setLinesArray] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const { currentIdx, setCurrentIdx } = useContext(TypingContext);
  const { hasStarted, setHasStarted } = useContext(TypingContext);
  const { seconds, startTimer, resetTimer,setSeconds } = useTimer();

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
    const value={
      inputValue, setInputValue,characterArray, setCharacterArray,linesArray, setLinesArray,
      currentLineIndex, setCurrentLineIndex,isFinished, setIsFinished,restartTest
    }

  return (
    <div className=''>
        <Navbar restartTest={restartTest}/>
        <TypingBox value={value}/>
    </div>
  )
}

export default Home