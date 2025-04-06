import { CycleProps } from "@/interfaces";
import { formatDistanceToNow } from "date-fns";

export function relativeDate(date: Date) {
  const _date = new Date(date);
  return formatDistanceToNow(_date, { addSuffix: true });
}

export function calculateTimeValues(
  activeCycle: CycleProps | undefined,
  amountSecondsPassed: number
) {
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, "0");
  const seconds = String(currentSeconds % 60).padStart(2, "0");
  return { minutes, seconds };
}
