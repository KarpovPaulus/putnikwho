import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationState {
  coords: Coordinates | null; // null — координаты ещё не определены
}

const initialState: LocationState = { coords: null };

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // "мутируем" state — за иммутабельность отвечает Immer (встроен в RTK)
    setUserLocation: (state, action: PayloadAction<Coordinates>) => {
      state.coords = action.payload;
    },
    clearUserLocation: (state) => {
      state.coords = null;
    },
  },
});

export const { setUserLocation, clearUserLocation } = locationSlice.actions;
export default locationSlice.reducer;
