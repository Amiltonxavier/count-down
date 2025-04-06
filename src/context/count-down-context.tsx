import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { differenceInSeconds } from "date-fns";
import { ID } from "appwrite";
import { toast } from "sonner";
import type { CycleProps } from "@/interfaces";
import type { TaskDTO } from "@/schema/task";
import { createNewTask, updateDocument } from "@/lib/appwirte";
import { useCyclesContext } from "./cycles-context";

interface CountDownContextData {
    minutes: string;
    seconds: string;
    // isSubmitDisabled: boolean;
    activeCycle: CycleProps | undefined;
    handleCreateNewCycle: (data: TaskDTO) => void;
    handleInterruptCycle: () => void;
    // isLoading: boolean;
}

export const CountDownContext = createContext({} as CountDownContextData);

export const CountDownContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const { cycles, setCycles, activeCycleId, setActiveCycleId, activeCycle } = useCyclesContext();

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    /*  const {
         watch,
         reset,
         formState: { isLoading },
     } = useForm<TaskDTO>({
         resolver: zodResolver(TaskCreateSchema),
         defaultValues: {
             task: "",
             minutesAmount: 0,
         },
     }); */

    const handleCreateNewCycle = ({ minutesAmount, task }: TaskDTO) => {
        const id = ID.unique();
        const newCycle: CycleProps = {
            id,
            task,
            minutesAmount,
            startDate: new Date(),
        };

        setCycles((prev) => [...prev, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
        //reset();

        createNewTask({
            id,
            task: newCycle.task,
            minutesAmount: newCycle.minutesAmount,
            startDate: newCycle.startDate,
            userId: user?.id || "",
        });
    };

    const handleInterruptCycle = () => {
        setCycles((state) => {
            const updated = state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    const updatedCycle = { ...cycle, interruptedDate: new Date() };
                    updateDocument(updatedCycle);
                    return updatedCycle;
                }
                return cycle;
            });

            return updated;
        });

        setActiveCycleId(null);
        setAmountSecondsPassed(0);
    };

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    // const task = watch("task");
    //const isSubmitDisabled = !task || isLoading;

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

                if (secondsDifference >= totalSeconds) {
                    const updated = cycles.map((cycle) => {
                        if (cycle.id === activeCycleId) {
                            const updatedCycle = { ...cycle, finishedDate: new Date() };
                            updateDocument(updatedCycle);
                            return updatedCycle;
                        }
                        return cycle;
                    });

                    setCycles(updated);
                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                    setActiveCycleId(null);
                    toast.success("Ciclo finalizado com sucesso!");
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [activeCycle, totalSeconds, activeCycleId, cycles, setCycles, setActiveCycleId]);

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    }, [minutes, seconds, activeCycle]);

    return (
        <CountDownContext.Provider
            value={{
                minutes,
                seconds,
                // isSubmitDisabled,
                activeCycle,
                handleCreateNewCycle,
                handleInterruptCycle,
                // isLoading,
            }}
        >
            {children}
        </CountDownContext.Provider>
    );
};


export const useCountDownContext = () => useContext(CountDownContext);
