import React, { createContext, useContext } from "react";
import type { CycleProps } from "../interfaces";


type HistoryContextType = {
    history: CycleProps[];
    setHistory: React.Dispatch<React.SetStateAction<CycleProps[]>>;
    activeCycleId: string | null;
    setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}

const historyContext = createContext({} as HistoryContextType);


export function HistoryContextProvider({ children }: { children: React.ReactNode }) {
    const [history, setHistory] = React.useState<CycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null);

    return (
        <historyContext.Provider value={{ history, setHistory, activeCycleId, setActiveCycleId }}>
            {children}
        </historyContext.Provider>
    )
}

export const useHistoryContext = () => useContext(historyContext);

