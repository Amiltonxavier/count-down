import { CountType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CountType = CountType.COUNT_UP as CountType;

const countTypeSlice = createSlice({
  name: "countType",
  initialState,
  reducers: {
    setCountType: (state, action: PayloadAction<CountType>) => {
      return action.payload;
    },
  },
});

export const { setCountType } = countTypeSlice.actions;

export default countTypeSlice.reducer;
