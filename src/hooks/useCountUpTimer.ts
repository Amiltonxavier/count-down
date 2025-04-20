import type { CycleProps } from "@/interfaces";
import { differenceInSeconds } from "date-fns";
import React from "react";

interface UseCountUpTimerProps {
  activeCycle: CycleProps | null;
  onFinishCycle?: (finishedCycle: CycleProps) => void;
}

export function useCountUpTimer({
  activeCycle,
  onFinishCycle,
}: UseCountUpTimerProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const minutesAmount = Math.floor(amountSecondsPassed / 60);
  const secondsAmount = amountSecondsPassed % 60;

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

        setAmountSecondsPassed(secondsDifference);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeCycle]);

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const finishCycle = () => {
    if (!activeCycle) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    onFinishCycle?.({
      ...activeCycle,
      finishedDate: new Date(),
    });
  };

  return {
    minutes,
    seconds,
    finishCycle,
  };
}
