import React, { useState } from 'react'
import { useEffect } from 'react'
import { VscDebugRestart } from "react-icons/vsc";
import { randomParagraphGenerator } from "../utils/Api.js";

const TypingBox = () => {
    const [paragraph, setParagraph] = useState("")
    const [characterArray,setcharacterArray]=useState([])

    const restartTest=()=>{
        randomParagraphGenerator().then((text) => {
            setParagraph(text)
            let characters=text.split("").map((ch)=>(
                {
                    char:ch,
                    status:"not-typed",
                }
            ))
            setcharacterArray(characters)
        });
    }
    
    useEffect(()=>{
        restartTest()
    },[])

    return (
        <div className=' w-full flex flex-col items-center justify-center py-12 '>
            <p className=' max-w-6xl text-3xl text-gray-500 leading-relaxed'>{paragraph}</p>
            <div className=' mt-8'>
                <VscDebugRestart size={28} onClick={restartTest} className=' text-gray-500 hover:text-gray-300' />
            </div>
        </div>
    )
}

export default TypingBox