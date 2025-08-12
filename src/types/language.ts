export type Language = 'en' | 'es';

export interface LanguageState {
  current: Language;
}

export interface Translation {
  [key: string]: string | Translation;
}