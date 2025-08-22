// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://192.168.10.192:8000',
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

// Helper function to build full URLs
export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};