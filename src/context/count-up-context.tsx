// src/contexts/CountUpContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

type CountUpCycle = {
    id: string;
    task: string;
    startDate: Date;
};

type CountUpContextType = {
    activeCycle: CountUpCycle | null;
    activeCycleId: string | null;
    startNewCycle: (task: string) => void;
    interruptCycle: () => void;
};

const CountUpContext = createContext({} as CountUpContextType);

export function CountUpProvider({ children }: { children: ReactNode }) {
    const [cycles, setCycles] = useState<CountUpCycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) || null;

    function startNewCycle(task: string) {
        const id = crypto.randomUUID();
        const newCycle: CountUpCycle = {
            id,
            task,
            startDate: new Date(),
        };
        setCycles((prev) => [...prev, newCycle]);
        setActiveCycleId(id);
    }

    function interruptCycle() {
        setActiveCycleId(null);
    }

    return (
        <CountUpContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                startNewCycle,
                interruptCycle,
            }}
        >
            {children}
        </CountUpContext.Provider>
    );
}

export function useCountUpContext() {
    return useContext(CountUpContext);
}
