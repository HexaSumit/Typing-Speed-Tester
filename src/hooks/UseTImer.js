import React, { useContext, useRef, useState, useEffect } from 'react'
import { TypingContext } from '../context/TypingContext'

const UseTImer = () => {
    const { time } = useContext(TypingContext)
    const [seconds, setSeconds] = useState(time)
    let intervalRef = useRef(null)

    useEffect(() => {
        setSeconds(time); // Naya time set
        clearInterval(intervalRef.current); // Purana timer stop
        intervalRef.current = null; // Reference clear
    }, [time]);

    const startTimer = () => {
        if (intervalRef.current) return;
        setIsActive(true);
        intervalRef.current =setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            })
        }, 1000)
    }


    const resetTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setSeconds(time);
    };
    return { seconds, startTimer, resetTimer };
}

export default UseTImer