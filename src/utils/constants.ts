/**
 * Application constants and configuration values
 */

/**
 * Default skill colors mapping
 */
export const SKILL_COLORS = {
  'JavaScript': 'text-yellow-500',
  'Python': 'text-blue-600',
  'FastAPI': 'text-green-600',
  'Git': 'text-orange-600',
  'Docker': 'text-blue-600',
  'Machine Learning': 'text-purple-600',
  'Communication': 'text-blue-500',
} as const;

/**
 * Social network platform mappings
 */
export const SOCIAL_PLATFORMS = {
  github: {
    name: 'GitHub',
    icon: 'Github',
    description: {
      es: 'Ver repositorios',
      en: 'View repositories'
    }
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'Linkedin',
    description: {
      es: 'Conectar profesionalmente',
      en: 'Connect professionally'
    }
  },
  twitter: {
    name: 'Twitter',
    icon: 'Twitter',
    description: {
      es: 'Seguir en Twitter',
      en: 'Follow on Twitter'
    }
  },
  instagram: {
    name: 'Instagram',
    icon: 'Instagram',
    description: {
      es: 'Seguir en Instagram',
      en: 'Follow on Instagram'
    }
  }
} as const;

/**
 * Navigation sections configuration
 */
export const NAVIGATION_SECTIONS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'contact'
] as const;

/**
 * Animation delays for staggered components
 */
export const ANIMATION_DELAYS = {
  FAST: 0.1,
  NORMAL: 0.2,
  SLOW: 0.3,
  SLOWER: 0.4
} as const;