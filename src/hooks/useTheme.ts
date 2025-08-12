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
    
    // Only set system theme if no theme is persisted
    const persistedTheme = localStorage.getItem('persist:root');
    if (!persistedTheme) {
      setCurrentTheme(systemTheme);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: Theme = e.matches ? 'dark' : 'light';
      setCurrentTheme(newSystemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setCurrentTheme]);

  return { theme, toggle, setTheme: setCurrentTheme };
};