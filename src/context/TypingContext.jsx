import { createContext,useState } from "react";

export const TypingContext = createContext();

export function TypingProvider({ children }) {
    const [time, setTime] = useState(15);

    const [hasStarted, setHasStarted] = useState(false)
    const value = { time, setTime,hasStarted, setHasStarted};

    return (
        <TypingContext.Provider value={value}>
            {children}
        </TypingContext.Provider>
    );
}