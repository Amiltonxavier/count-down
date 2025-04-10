import type { CycleProps } from "@/interfaces";
import { createContext, useContext, useMemo, useState } from "react";

interface CyclesContextData {
    cycles: CycleProps[];
    activeCycle: CycleProps | null;
    activeCycleId: string | null;
    setCycles: React.Dispatch<React.SetStateAction<CycleProps[]>>;
    setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CyclesContext = createContext({} as CyclesContextData);

export const CyclesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = useMemo(() => {
        return cycles.find(cycle => cycle.id === activeCycleId) || null;
    }, [cycles, activeCycleId]);

    return (
        <CyclesContext.Provider value={{ cycles, setCycles, activeCycleId, setActiveCycleId, activeCycle }}>
            {children}
        </CyclesContext.Provider>
    );
};
export const useCyclesContext = () => useContext(CyclesContext);