// src/contexts/CountUpContext.tsx

import * as React from 'react';
import { ID } from 'appwrite';
import { useCyclesContext } from './cycles-context';
import type { CycleProps } from '@/interfaces';
import { differenceInSeconds } from 'date-fns';
import { updateDocument } from '@/lib/appwirte';

type CountUpContextType = {
    startNewCycle: (task: string) => void;
    interruptCycle: () => void;
    secondsPassed: number;
    minutes: string;
    seconds: string;
    activeCycle: CycleProps | null;
};

type CountUpProviderProps = {
    children: React.ReactNode;
};

const CountUpContext = React.createContext({} as CountUpContextType);

export function CountUpProvider({ children }: CountUpProviderProps) {
    const { setCycles, setActiveCycleId, activeCycle } = useCyclesContext();
    const [secondsPassed, setSecondsPassed] = React.useState(0);

    function startNewCycle(task: string) {
        const id = ID.unique();
        const newCycle: CycleProps = {
            id,
            task,
            startDate: new Date(),
            minutesAmount: 0,
        };

        setCycles((prev) => [...prev, newCycle]);
        setActiveCycleId(id);
        setSecondsPassed(0);
    }

    function interruptCycle() {
        if (!activeCycle) return;

        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycle.id) {
                    const updatedCycle = { ...cycle, interruptedDate: new Date() };
                    updateDocument(updatedCycle);
                    return updatedCycle;
                }
                return cycle;
            })
        );

        setActiveCycleId(null);
        setSecondsPassed(0);
    }

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (activeCycle) {
            interval = setInterval(() => {
                const now = new Date();
                const start = new Date(activeCycle.startDate);
                const secondsDifference = differenceInSeconds(now, start);
                setSecondsPassed(secondsDifference);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeCycle]);

    const minutesAmount = Math.floor(secondsPassed / 60);
    const secondsAmount = secondsPassed % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    return (
        <CountUpContext.Provider
            value={{
                startNewCycle,
                interruptCycle,
                secondsPassed,
                minutes,
                seconds,
                activeCycle,
            }}
        >
            {children}
        </CountUpContext.Provider>
    );
}

export function useCountUpContext() {
    return React.useContext(CountUpContext);
}
