import { api } from "@/api";
import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import settingsSlice from "./settingsSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer, // ключ → state.location.*
    settings: settingsSlice,
    [api.reducerPath]: api.reducer, // ключ → state.api.* (кэш запросов)
  },
  // Middleware RTK Query: запускает запросы, ведёт кэш,
  // убирает данные, которые больше никому не нужны
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
