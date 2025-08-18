import { createContext,useState } from "react";

export const TypingContext = createContext();

export function TypingProvider({ children }) {
    const [time, setTime] = useState(30);

    const [hasStarted, setHasStarted] = useState(false)
    const [currentIdx, setCurrentIdx] = useState(0);
    const value = { time, setTime,hasStarted, setHasStarted,currentIdx,setCurrentIdx};

    return (
        <TypingContext.Provider value={value}>
            {children}
        </TypingContext.Provider>
    );
}