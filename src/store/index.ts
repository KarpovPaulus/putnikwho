import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer, // ключ → state.location.*
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
