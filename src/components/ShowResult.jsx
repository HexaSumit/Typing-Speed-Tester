import React from "react";
import { Button } from "./ui/button";
import { VscDebugRestart } from "react-icons/vsc";

const ShowResult = ({ charArray, totalTime, onRestart }) => {
    // Calculate correct characters
    const correctChars = charArray.filter((c) => c.status === "correct").length;

    //  Calculate incorrect characters
    const incorrectChars = charArray.filter((c) => c.status === "incorrect").length;

    // WPM calculation
    const totalTestTime = 60; // allotted test time in seconds
    const elapsedTime = totalTestTime - totalTime; // jo tum pass kar rahe ho wo remaining hai
    const timeMinutes = elapsedTime / 60;

    const wpm = timeMinutes > 0
        ? Math.round((correctChars / 5) / timeMinutes)
        : 0;

    // Accuracy calculation
    const totalTyped = correctChars + incorrectChars;
    const accuracy = totalTyped > 0 ? ((correctChars / totalTyped) * 100).toFixed(1) : 0;

    return (
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Result</h2>

            <div className="grid grid-cols-2 gap-6 text-center mb-6">
                <div>
                    <p className="text-lg text-gray-500">WPM</p>
                    <p className="text-3xl font-bold text-blue-600">{wpm}</p>
                </div>
                <div>
                    <p className="text-lg text-gray-500">Accuracy</p>
                    <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
                </div>
                <div>
                    <p className="text-lg text-gray-500">Correct</p>
                    <p className="text-3xl font-bold text-green-500">{correctChars}</p>
                </div>
                <div>
                    <p className="text-lg text-gray-500">Incorrect</p>
                    <p className="text-3xl font-bold text-red-500">{incorrectChars}</p>
                </div>
            </div>

            <Button onClick={onRestart} variant="destructive" className="flex items-center gap-2">
                <VscDebugRestart size={20} />
                Restart Test
            </Button>
        </div>
    );
};

export default ShowResult;
