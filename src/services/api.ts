import { API_CONFIG } from '@/config/api';
import { SiteConfig, AboutProfile, SkillsResponse, ExperienceResponse, ProjectsResponse, EducationResponse, ContactResponse } from '@/types/api';

// Generic API fetch function
async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network Error: Unable to connect to backend');
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