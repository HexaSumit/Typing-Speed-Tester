import React, { useState, useEffect, useContext } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { randomParagraphGenerator } from "../utils/Api.js";
import { Button } from "./ui/button.jsx";
import UseTimer from "../hooks/UseTimer.js";
import { TypingContext } from "../context/TypingContext.jsx";
import ShowResult from "./ShowResult.jsx";



const TypingBox = () => {
    const [inputValue, setInputValue] = useState("")
    const [characterArray, setCharacterArray] = useState([]);
    const {currentIdx, setCurrentIdx} = useContext(TypingContext)
    const { hasStarted, setHasStarted } = useContext(TypingContext)//to check whether user started typing or not

    const { seconds, startTimer, resetTimer } = UseTimer(); //taken from useTimer.js

    // check krne ke liye ki khatam hua ki nahi (below text)
    const [isFinished, setIsFinished] = useState(false);



    // Restart Logic
    const restartTest = () => {
        randomParagraphGenerator().then((text) => {
            const characters = text.split("").map((ch) => ({
                char: ch,
                status: "not-typed",
            }));
            setCharacterArray(characters);
            setCurrentIdx(0); // Reset currentIdx
            setHasStarted(false)
            setIsFinished(false); //reset finished state
            setInputValue("")
            resetTimer();
        });
    };

    // Load paragraph 
    useEffect(() => {
        restartTest();
    }, []);

    useEffect(() => {
        if (seconds === 0 && hasStarted || currentIdx === characterArray.length) {
            setIsFinished(true);
        }
    }, [seconds, hasStarted,characterArray.length]);

    // Typing Logic
    const handleInput = (e) => {
        const key = e.key;

        //  First key press par timer start
        if (!hasStarted && key.length === 1) {
            setHasStarted(true);
            startTimer();
        }

        // Backspace case
        if (key === "Backspace" && currentIdx > 0) {
            const updatedArray = [...characterArray];
            updatedArray[currentIdx - 1].status = "not-typed";
            setCharacterArray(updatedArray);
            setCurrentIdx((prev) => prev - 1);
            return;
        }

        //  Normal character case
        if (currentIdx < characterArray.length && key.length === 1) {
            const updatedArray = [...characterArray];

            if (key === characterArray[currentIdx].char) {
                updatedArray[currentIdx].status = "correct";
            } else {
                updatedArray[currentIdx].status = "incorrect";
            }

            setCharacterArray(updatedArray);
            setCurrentIdx((prev) => prev + 1);
        }
    };

    return (
        <div className=" bg-gray-800 w-full flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-700">Typing Speed Test</h1>

            {isFinished ? (
                <ShowResult
                    charArray={characterArray}
                    totalTime={seconds}
                    onRestart={restartTest}
                />
            ) : (
                <>
                    <h2 className="text-xl mb-3 font-bold text-gray-300">Time Left : {seconds}s</h2>
                    {/* Typing Text */}
                    <div className="w-full max-w-6xl p-4 mb-6 ">
                        <p className="text-2xl text-gray-600 leading-relaxed font-mono tracking-wide whitespace-pre-wrap break-normal">
                            {characterArray.map((item, index) => (
                                <span
                                    key={index}
                                    className={
                                        item.status === "correct"
                                            ? "text-gray-100"
                                            : item.status === "incorrect"
                                                ? "text-red-500"
                                                : "text-gray-500"
                                    }
                                >
                                    {item.char}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/*Input Field */}
                    <input
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleInput}
                        disabled={seconds === 0}
                        placeholder="Start typing here..."
                        className="border-2 border-gray-300 focus:border-blue-500 outline-none p-3 rounded-lg w-96 text-lg text-gray-500 shadow-sm"
                    />

                    {/* Restart Button */}
                    <div className="mt-4">
                        <Button onClick={restartTest} variant="destructive" className="flex items-center gap-2">
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