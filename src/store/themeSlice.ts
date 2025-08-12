import { createSlice } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from '../types/theme';

const initialState: ThemeState = {
  current: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: { payload: Theme }) => {
      state.current = action.payload;
    },
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;