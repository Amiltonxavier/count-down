import type { CycleProps } from "@/interfaces";
import { createContext, useContext, useMemo, useState } from "react";
import { useCountTypeContext } from "./type-count-context";

interface CyclesContextData {
    cycles: CycleProps[];
    activeCycle: CycleProps | null;
    setCycles: React.Dispatch<React.SetStateAction<CycleProps[]>>;
    setActiveCycleId: (id: string | null) => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

export const CyclesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const { countType } = useCountTypeContext();
    const [activeCycleIds, setActiveCycleIds] = useState<{
        countUp: string | null;
        countDown: string | null;
    }>({
        countUp: null,
        countDown: null,
    });

    const activeCycle = useMemo(() => {
        return cycles.find(cycle => cycle.id === activeCycleIds[countType]) || null;
    }, [cycles, activeCycleIds, countType]);

    const setActiveCycleId = (id: string | null) => {
        setActiveCycleIds(prev => ({
            ...prev,
            [countType]: id,
        }));
    };

    return (
        <CyclesContext.Provider value={{ cycles, setCycles, activeCycle, setActiveCycleId }}>
            {children}
        </CyclesContext.Provider>
    );
};

export const useCyclesContext = () => useContext(CyclesContext);
