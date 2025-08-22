import { API_CONFIG } from '@/config/api';
import { SiteConfig, AboutProfile, SkillsResponse, ExperienceResponse, ProjectsResponse, EducationResponse, ContactResponse } from '@/types/api';

/**
 * API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Network Error class for connection issues
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generic API fetch function with retry logic and better error handling
 * @param endpoint - API endpoint to fetch
 * @param retryCount - Current retry attempt (for internal use)
 * @returns Promise with typed response
 */
async function fetchApi<T>(endpoint: string, retryCount = 0): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `API Error: ${response.status} ${response.statusText}`
      );
    }
    
    const data = await response.json();
    
    // Log successful API calls in development
    if (import.meta.env.DEV) {
      console.debug(`✅ API Success: ${url}`, { status: response.status });
    }
    
    return data;
    
  } catch (error) {
    // Handle network errors and timeouts
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      const networkError = new NetworkError('Network Error: Unable to connect to backend');
      
      // Retry on network errors
      if (retryCount < API_CONFIG.RETRY_ATTEMPTS) {
        console.warn(`🔄 Retrying API call (${retryCount + 1}/${API_CONFIG.RETRY_ATTEMPTS}): ${endpoint}`);
        await sleep(1000 * (retryCount + 1)); // Exponential backoff
        return fetchApi<T>(endpoint, retryCount + 1);
      }
      
      throw networkError;
    }
    
    // Handle abort/timeout errors
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('Request timeout: API call took too long');
    }
    
    // Log errors in development
    if (import.meta.env.DEV) {
      console.error(`❌ API Error: ${endpoint}`, error);
    }
    
    throw error;
  }
}

// Site Configuration API
export const siteConfigService = {
  async getSiteConfig(): Promise<SiteConfig> {
    return fetchApi<SiteConfig>(API_CONFIG.ENDPOINTS.SITE_CONFIG);
  }
};

// About/Profile API  
export const aboutService = {
  async getAboutData(): Promise<AboutProfile> {
    return fetchApi<AboutProfile>(API_CONFIG.ENDPOINTS.ABOUT);
  }
};

// Skills API
export const skillsService = {
  async getSkills(): Promise<SkillsResponse> {
    return fetchApi<SkillsResponse>(API_CONFIG.ENDPOINTS.SKILLS);
  }
};

// Experience API
export const experienceService = {
  async getExperience(): Promise<ExperienceResponse> {
    return fetchApi<ExperienceResponse>(API_CONFIG.ENDPOINTS.EXPERIENCE);
  }
};

// Projects API
export const projectsService = {
  async getProjects(): Promise<ProjectsResponse> {
    return fetchApi<ProjectsResponse>(API_CONFIG.ENDPOINTS.PROJECTS);
  }
};

// Education API
export const educationService = {
  async getEducation(): Promise<EducationResponse> {
    return fetchApi<EducationResponse>(API_CONFIG.ENDPOINTS.EDUCATION);
  }
};

// Contact API
export const contactService = {
  async getContact(): Promise<ContactResponse> {
    return fetchApi<ContactResponse>(API_CONFIG.ENDPOINTS.CONTACT);
  }
};