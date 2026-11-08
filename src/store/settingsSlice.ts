import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// «Светлая / Тёмная / Как в системе» — см. «Дизайн и темы»
export type ThemePreference = "system" | "light" | "dark";

interface SettingsState {
  themePreference: ThemePreference;
}

const initialState: SettingsState = { themePreference: "system" };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setThemePreference: (state, action: PayloadAction<ThemePreference>) => {
      state.themePreference = action.payload;
    },
  },
});

export const { setThemePreference } = settingsSlice.actions;
export default settingsSlice.reducer;
