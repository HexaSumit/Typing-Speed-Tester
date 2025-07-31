import React, { useState } from 'react'
import { useEffect } from 'react'
import { VscDebugRestart } from "react-icons/vsc";
import { randomParagraphGenerator } from "../utils/Api.js";
import { Button } from './ui/button.jsx';

const TypingBox = () => {
    const [paragraph, setParagraph] = useState("")
    const [characterArray, setcharacterArray] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)  // for checking word by word

    const restartTest = () => {
        randomParagraphGenerator().then((text) => {
            setParagraph(text)
            let characters = text.split("").map((ch) => (
                {
                    char: ch,
                    status: "not-typed",
                }
            ))
            setcharacterArray(characters)
        });
    }
    const handleInput = (e) => {
        console.log(e.key)
    }

    useEffect(() => {
        restartTest()
    }, [])

    return (
        <div className="w-full flex flex-col items-center justify-center pt-8 px-4">
            {/* Heading */}
            <h1 className="text-4xl font-bold mb-6 text-gray-700">Typing Speed Test</h1>

            {/* Text to Type */}
            <div className="max-w-7xl bg-gray-100 p-6 rounded-xl shadow-md mb-6">
                <p className="text-2xl text-gray-600 leading-relaxed font-mono tracking-wide">
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
                            {item.char}
                        </span>
                    ))}
                </p>
            </div>

            {/* Input Field */}
            <input
                autoFocus
                onKeyDown={handleInput}
                placeholder="Start typing here..."
                className="border-2 border-gray-300 focus:border-blue-500 outline-none p-3 rounded-lg w-96 text-lg text-gray-700 shadow-sm"
            />

            {/* Restart Button */}
            <div className=' mt-3'>
                <Button variant='destructive'>
                    <span><VscDebugRestart /></span>
                    <span>Restart</span>
                </Button>
            </div>
        </div>

    )
}

export default TypingBox