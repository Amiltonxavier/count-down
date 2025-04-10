// src/contexts/CountUpContext.tsx

import * as React from 'react';
import { ID } from 'appwrite';
import { useCyclesContext } from './cycles-context';
import { CycleProps } from '@/interfaces';
import { differenceInSeconds } from 'date-fns';

type CountUpContextType = {
    activeCycleId: string | null;
    startNewCycle: (task: string) => void;
    interruptCycle: () => void;
    secondsPassed: number;
    minutes: string;
    seconds: string;
};

const CountUpContext = React.createContext({} as CountUpContextType);

export function CountUpProvider({ children }: { children: React.ReactNode }) {
    const { setCycles, activeCycleId, setActiveCycleId, activeCycle } = useCyclesContext();
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
        setSecondsPassed(0);
        setActiveCycleId(id);
    }

    function interruptCycle() {
        setActiveCycleId(null);
        setSecondsPassed(0);
    }

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (activeCycle) {
            interval = setInterval(() => {
                const now = new Date();
                const start = new Date(activeCycle.startDate);

                setSecondsPassed(differenceInSeconds(now, start));
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [activeCycle]);

    const minutesAmount = Math.floor(secondsPassed / 60);
    const secondsAmount = secondsPassed % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");



    return (
        <CountUpContext.Provider
            value={{
                activeCycleId,
                startNewCycle,
                interruptCycle,
                secondsPassed,
                minutes,
                seconds,
            }}
        >
            {children}
        </CountUpContext.Provider>
    );
}

export function useCountUpContext() {
    return React.useContext(CountUpContext);
}
