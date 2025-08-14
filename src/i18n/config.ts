import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import esCommon from '../locales/es/common.json';
import esNavigation from '../locales/es/navigation.json';
import esHero from '../locales/es/hero.json';
import esAbout from '../locales/es/about.json';
import esSkills from '../locales/es/skills.json';
import esProjects from '../locales/es/projects.json';
import esExperience from '../locales/es/experience.json';
import esEducation from '../locales/es/education.json';
import esContact from '../locales/es/contact.json';

import enCommon from '../locales/en/common.json';
import enNavigation from '../locales/en/navigation.json';
import enHero from '../locales/en/hero.json';
import enAbout from '../locales/en/about.json';
import enSkills from '../locales/en/skills.json';
import enProjects from '../locales/en/projects.json';
import enExperience from '../locales/en/experience.json';
import enEducation from '../locales/en/education.json';
import enContact from '../locales/en/contact.json';

const resources = {
  es: {
    common: esCommon,
    navigation: esNavigation,
    hero: esHero,
    about: esAbout,
    skills: esSkills,
    projects: esProjects,
    experience: esExperience,
    education: esEducation,
    contact: esContact,
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    hero: enHero,
    about: enAbout,
    skills: enSkills,
    projects: enProjects,
    experience: enExperience,
    education: enEducation,
    contact: enContact,
  },
};

const supportedLanguages = ['es', 'en'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'navigation', 'hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'],
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    debug: process.env.NODE_ENV === 'development',

    supportedLngs: supportedLanguages,
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;