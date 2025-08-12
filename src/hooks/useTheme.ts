import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import { setTheme, toggleTheme } from '../store/themeSlice';
import type { Theme } from '../types/theme';

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.current);
  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleTheme());
  const setCurrentTheme = (newTheme: Theme) => dispatch(setTheme(newTheme));

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Initialize theme based on system preference if not set
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme: Theme = mediaQuery.matches ? 'dark' : 'light';
    
    // Check if we have persisted state
    const persistedState = localStorage.getItem('persist:root');
    if (!persistedState) {
      // No persisted state, use system preference
      setCurrentTheme(systemTheme);
    } else {
      // We have persisted state, but let's ensure the DOM is updated
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []); // Only run once on mount

  return { theme, toggle, setTheme: setCurrentTheme };
};