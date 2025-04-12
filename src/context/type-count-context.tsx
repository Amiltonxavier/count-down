import { CountType } from "@/types";
import React from "react";

type CountTypeContextType = {
    countType: CountType;
    setCountType: React.Dispatch<React.SetStateAction<CountType>>;
};

export const CountTypeContext = React.createContext({} as CountTypeContextType);
export function CountTypeProvider({ children }: { children: React.ReactNode }) {
    const [countType, setCountType] = React.useState<CountType>(CountType.COUNT_UP);
    return (
        <CountTypeContext.Provider value={{ countType, setCountType }}>
            {children}
        </CountTypeContext.Provider>
    );
}
export function useCountTypeContext() {
    const context = React.useContext(CountTypeContext);
    if (!context) {
        throw new Error('useCountTypeContext must be used within a CountTypeProvider');
    }
    return context;
}