import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import { setLanguage, toggleLanguage } from '../store/languageSlice';
import { getTranslation } from '../locales';
import type { Language } from '../types/language';

export const useLanguage = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleLanguage());
  const setCurrentLanguage = (newLanguage: Language) => dispatch(setLanguage(newLanguage));

  // Get translations for current language
  const translations = getTranslation(language);

  // Translation function with nested key support
  const t = (key: string, variables?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    let result = typeof value === 'string' ? value : key;

    // Replace variables if provided
    if (variables && typeof result === 'string') {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        result = result.replace(new RegExp(`{{${varKey}}}`, 'g'), varValue);
      });
    }

    return result;
  };

  // Initialize language based on browser preference if not set
  useEffect(() => {
    const browserLanguage = navigator.language.split('-')[0] as Language;
    const supportedLanguages: Language[] = ['en', 'es'];
    
    // Only set browser language if no language is persisted
    const persistedLanguage = localStorage.getItem('persist:root');
    if (!persistedLanguage && supportedLanguages.includes(browserLanguage)) {
      setCurrentLanguage(browserLanguage);
    }
  }, [setCurrentLanguage]);

  // Set document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return { 
    language, 
    toggle, 
    setLanguage: setCurrentLanguage, 
    t 
  };
};