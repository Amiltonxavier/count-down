import { configureStore } from "@reduxjs/toolkit";
import cyclesReducer from "./slices/cyclesSlice";
import countTypeReducer from "./slices/countTypeSlice";

export const store = configureStore({
  reducer: {
    cycles: cyclesReducer,
    countType: countTypeReducer,
  },
});
