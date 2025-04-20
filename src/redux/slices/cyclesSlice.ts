import type { CycleProps } from "@/interfaces";
import type { CountType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CycleState {
  cycles: CycleProps[];
  activeCycleId: {
    countUp: string | null;
    countDown: string | null;
  };
}

interface InterrupCyclePayloadProps {
  id: Pick<CycleProps, "id">;
  type: CountType;
}

const initialState: CycleState = {
  cycles: [],
  activeCycleId: {
    countUp: null,
    countDown: null,
  },
};
const cyclesSlice = createSlice({
  name: "cycles",
  initialState,
  reducers: {
    addCycle: (state, action: PayloadAction<CycleProps>) => {
      state.cycles.push(action.payload);
      state.activeCycleId[action.payload.type] = action.payload.id;
    },

    interruptCycle(state, action: PayloadAction<InterrupCyclePayloadProps>) {
      const cycle: CycleProps | undefined = state.cycles.find(
        (cycle: CycleProps) => cycle.id === action.payload.id.id
      );
      if (cycle) {
        cycle.interruptedDate = new Date();
        state.activeCycleId[action.payload.type] = null;
      }
    },
    finishCycle(state, action: PayloadAction<InterrupCyclePayloadProps>) {
      const cycle: CycleProps | undefined = state.cycles.find(
        (cycle: CycleProps) => cycle.id === action.payload.id.id
      );
      if (cycle) cycle.finishedDate = new Date();
      state.activeCycleId[action.payload.type] = null;
    },

    setActiveCycleId(
      state,
      action: PayloadAction<{ id: string | null; type: CountType }>
    ) {
      state.activeCycleId[action.payload.type] = action.payload.id;
    },
  },
});

export const { addCycle, interruptCycle, finishCycle, setActiveCycleId } =
  cyclesSlice.actions;

export default cyclesSlice.reducer;
