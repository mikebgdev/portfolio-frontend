/**
 * API Configuration
 * Centralized configuration for all API endpoints and settings
 */

// Environment variables with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  return import.meta.env[key] || fallback;
};

export const API_CONFIG = {
  BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000'),
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    // Navigation/Header
    SITE_CONFIG: '/api/v1/site-config/',
    
    // About section (also includes contact info)
    ABOUT: '/api/v1/about/',
    
    // Skills section  
    SKILLS: '/api/v1/skills/',
    
    // Projects section
    PROJECTS: '/api/v1/projects/',
    
    // Experience section
    EXPERIENCE: '/api/v1/experience/',
    
    // Education section
    EDUCATION: '/api/v1/education/',
    
    // Contact section (social networks, CV)
    CONTACT: '/api/v1/contact/',
  }
} as const;

/**
 * Helper function to build full URLs
 * @param endpoint - The endpoint key from API_CONFIG.ENDPOINTS
 * @returns Full URL string
 */
export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};

/**
 * App Configuration
 */
export const APP_CONFIG = {
  NAME: getEnvVar('VITE_APP_NAME', 'Portfolio'),
  VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  ENVIRONMENT: getEnvVar('VITE_ENVIRONMENT', 'development'),
} as const;