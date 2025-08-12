import { en } from './en';
import { es } from './es';
import type { Language } from '../types/language';

export const translations = {
  en,
  es,
} as const;

export type TranslationKeys = typeof en;

export const getTranslation = (language: Language) => translations[language];