import type { CycleProps } from "@/interfaces";
import { differenceInSeconds } from "date-fns";
import React from "react";
import { toast } from "sonner";

interface UseCountDownTimerProps {
  activeCycle: CycleProps | null;
  onFinishCycle: (cycle: CycleProps) => void;
}

export function useCountDownTimer({
  activeCycle,
  onFinishCycle,
}: UseCountDownTimerProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          onFinishCycle({ ...activeCycle, finishedDate: new Date() });
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
          toast.success("Ciclo finalizado com sucesso!");
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeCycle, totalSeconds, onFinishCycle]);

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return {
    minutes,
    seconds,
    amountSecondsPassed,
    setAmountSecondsPassed,
  };
}
