import { createSlice } from '@reduxjs/toolkit';
import type { Language, LanguageState } from '../types/language';

const initialState: LanguageState = {
  current: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: Language }) => {
      state.current = action.payload;
    },
    toggleLanguage: (state) => {
      state.current = state.current === 'en' ? 'es' : 'en';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;