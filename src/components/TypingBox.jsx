import React, { useState, useEffect } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { randomParagraphGenerator } from "../utils/Api.js";
import { Button } from "./ui/button.jsx";




const TypingBox = () => {
    const [characterArray, setCharacterArray] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);

    // Restart Logic
    const restartTest = () => {
        randomParagraphGenerator().then((text) => {
            const characters = text.split("").map((ch) => ({
                char: ch,
                status: "not-typed",
            }));
            setCharacterArray(characters);
            setCurrentIdx(0); // Reset currentIdx
        });
    };

    // Load paragraph 
    useEffect(() => {
        restartTest();
    }, []);

    // Typing Logic
    const handleInput = (e) => {
        const key = e.key;

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
        <div className="w-full flex flex-col items-center justify-center pt-8 px-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-700">Typing Speed Test</h1>

            {/* Typing Text */}
            <div className="max-w-7xl bg-gray-100 p-6 rounded-xl shadow-md mb-6">
                <p className="text-2xl text-gray-600 leading-relaxed font-mono tracking-wide flex flex-wrap whitespace-pre-wrap">
                    {characterArray.map((item, index) => (
                        <span
                            key={index}
                            className={
                                item.status === "correct"
                                    ? "text-green-500"
                                    : item.status === "incorrect"
                                        ? "text-red-500"
                                        : "text-gray-500"
                            }
                        >
                            {item.char === " " ? "\u00A0" : item.char}
                        </span>
                    ))}
                </p>
            </div>

            {/*Input Field */}
            <input
                autoFocus
                onKeyDown={handleInput}
                placeholder="Start typing here..."
                className="border-2 border-gray-300 focus:border-blue-500 outline-none p-3 rounded-lg w-96 text-lg text-gray-700 shadow-sm"
            />

            {/* Restart Button */}
            <div className="mt-4">
                <Button onClick={restartTest} variant="destructive" className="flex items-center gap-2">
                    <VscDebugRestart size={20} />
                    Restart Test
                </Button>
            </div>
        </div>
    );
};

export default TypingBox;