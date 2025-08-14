import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language || 'es';
  }, [i18n]);

  const getAvailableLanguages = useCallback(() => {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
    ];
  }, []);

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    availableLanguages: getAvailableLanguages(),
    isLanguageLoaded: i18n.isInitialized,
  };
};

export const useNamespacedTranslation = (namespace: string) => {
  const { t, i18n } = useTranslation(namespace);
  
  return {
    t,
    i18n,
    ready: i18n.isInitialized,
  };
};