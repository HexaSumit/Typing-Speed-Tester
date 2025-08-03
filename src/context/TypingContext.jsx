import { createContext,useState } from "react";

export const TypingContext = createContext();

export function TypingProvider({ children }) {
    const [time, setTime] = useState(15);

    const value = { time, setTime};

    return (
        <TypingContext.Provider value={value}>
            {children}
        </TypingContext.Provider>
    );
}