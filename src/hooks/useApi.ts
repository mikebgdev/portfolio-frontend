import { useState, useEffect } from 'react';
import { siteConfigService, aboutService, skillsService, experienceService, projectsService, educationService, contactService } from '@/services/api';
import { SiteConfig, AboutProfile, ProcessedAboutData, ProcessedHeroData, ContactInfo, SkillsResponse, ExperienceResponse, ProcessedExperienceItem, ProjectsResponse, ProcessedProjectItem, EducationResponse, ProcessedEducationItem, ContactResponse, ProcessedContactData, SocialNetwork } from '@/types/api';
import { useTranslation } from 'react-i18next';
import { processTextContent, processDescription, processTags, formatPeriod } from '@/utils';

// Hook for Site Configuration
export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        setLoading(true);
        const config = await siteConfigService.getSiteConfig();
        setSiteConfig(config);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading site config');
        console.error('Error fetching site config:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteConfig();
  }, []);

  return { siteConfig, loading, error };
}

// Hook for About/Profile Data
export function useAboutData() {
  const [aboutData, setAboutData] = useState<ProcessedAboutData | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n, t } = useTranslation('about');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await aboutService.getAboutData();
        
        // Process data for About component
        const currentLang = i18n.language;
        const bio = currentLang === 'es' ? data.bio_es : data.bio_en;
        const jobTitle = currentLang === 'es' ? data.job_title_es : data.job_title_en;
        
        // Process bio using utility function
        const bioArray = processTextContent(bio);
        
        const processedData: ProcessedAboutData = {
          full_name: `${data.name} ${data.last_name}`,
          title: jobTitle,
          image_url: data.photo_url,
          description: bioArray
        };
        
        // Process contact info (email and location only)
        const contacts: ContactInfo[] = [
          {
            type: 'email',
            value: data.email,
            link: `mailto:${data.email}`
          },
          {
            type: 'location',
            value: data.location,
            link: "#"
          }
        ];
        
        setAboutData(processedData);
        setContactInfo(contacts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading about data');
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, [i18n.language]);

  return { aboutData, contactInfo, loading, error };
}

// Hook for Hero Data
export function useHeroData() {
  const [heroData, setHeroData] = useState<ProcessedHeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await aboutService.getAboutData();
        
        // Process data for Hero component
        const currentLang = i18n.language;
        const heroDescription = currentLang === 'es' ? data.hero_description_es : data.hero_description_en;
        
        const processedData: ProcessedHeroData = {
          name: data.name,
          last_name: data.last_name,
          full_name: `${data.name} ${data.last_name}`,
          hero_description: heroDescription
        };
        
        setHeroData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading hero data');
        console.error('Error fetching hero data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [i18n.language]);

  return { heroData, loading, error };
}

// Hook for Skills Data
export function useSkills() {
  const [skillsData, setSkillsData] = useState<SkillsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await skillsService.getSkills();
        setSkillsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading skills data');
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skillsData, loading, error };
}

// Hook for Experience Data
export function useExperience() {
  const [experienceData, setExperienceData] = useState<ProcessedExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await experienceService.getExperience();
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Experience API returned invalid data structure');
        }
        
        // Process and sort data
        const currentLang = i18n.language;
        const processedData = data
          .filter(item => item.activo) // Only active experiences
          .sort((a, b) => a.display_order - b.display_order) // Sort by display_order
          .map(item => {
            const position = currentLang === 'es' ? (item.position_es || item.position_en) : (item.position_en || item.position_es);
            const description = currentLang === 'es' ? (item.description_es || item.description_en) : (item.description_en || item.description_es);
            
            // Process description using utility function
            const descriptionArray = processDescription(description);

            // Format dates using utility function
            const period = formatPeriod(
              item.start_date,
              item.end_date,
              currentLang === 'es' ? 'es-ES' : 'en-US'
            );

            return {
              title: position,
              company: item.company,
              location: item.location,
              period: period,
              description: descriptionArray
            };
          });
        
        setExperienceData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading experience data');
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [i18n.language]);

  return { experienceData, loading, error };
}

// Hook for Projects Data
export function useProjects() {
  const [projectsData, setProjectsData] = useState<ProcessedProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsService.getProjects();
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Projects API returned invalid data structure');
        }
        
        // Process and sort data
        const currentLang = i18n.language;
        const processedData = data
          .filter(item => item.activa) // Only active projects
          .sort((a, b) => a.display_order - b.display_order) // Sort by display_order
          .map(item => {
            const title = currentLang === 'es' ? (item.title_es || item.title_en) : (item.title_en || item.title_es);
            const description = currentLang === 'es' ? (item.description_es || item.description_en) : (item.description_en || item.description_es);
            
            // Process tags using utility function
            const tags = processTags(item.technologies);

            return {
              title: title,
              description: description,
              image: item.image_data?.data || item.image_url,
              tags: tags,
              githubUrl: item.source_url,
              liveUrl: item.demo_url || undefined
            };
          });
        
        setProjectsData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading projects data');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  return { projectsData, loading, error };
}

// Hook for Education Data
export function useEducation() {
  const [educationData, setEducationData] = useState<ProcessedEducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await educationService.getEducation();
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Education API returned invalid data structure');
        }
        
        // Process and sort data
        const currentLang = i18n.language;
        const processedData = data
          .filter(item => item.activo) // Only active education
          .sort((a, b) => a.display_order - b.display_order) // Sort by display_order
          .map(item => {
            const degree = currentLang === 'es' ? (item.degree_es || item.degree_en) : (item.degree_en || item.degree_es);
            
            // Format dates using utility function
            const period = formatPeriod(
              item.start_date,
              item.end_date,
              currentLang === 'es' ? 'es-ES' : 'en-US'
            );
            
            return {
              degree: degree,
              institution: item.institution,
              location: item.location,
              period: period,
              description: degree // Using degree as description for now
            };
          });
        
        setEducationData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading education data');
        console.error('Error fetching education:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [i18n.language]);

  return { educationData, loading, error };
}

// Hook for Contact Data (social networks, CV)
export function useContact() {
  const [contactData, setContactData] = useState<ProcessedContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contactService.getContact();
        
        // Validate data structure
        if (!data) {
          throw new Error('Contact API returned null data');
        }
        
        // Process social networks - combine array data with individual URLs
        const socialNetworks: SocialNetwork[] = [];
        
        // Add from social_networks array if exists
        if (data.social_networks) {
          socialNetworks.push(...data.social_networks.filter(network => network.active));
        }
        
        // Add individual social network URLs
        if (data.github_url) {
          socialNetworks.push({
            platform: 'GitHub',
            url: data.github_url,
            icon_name: 'Github',
            active: true,
            display_order: 1
          });
        }
        
        if (data.linkedin_url) {
          socialNetworks.push({
            platform: 'LinkedIn',
            url: data.linkedin_url,
            icon_name: 'Linkedin',
            active: true,
            display_order: 2
          });
        }
        
        if (data.twitter_url) {
          socialNetworks.push({
            platform: 'Twitter',
            url: data.twitter_url,
            icon_name: 'Twitter',
            active: true,
            display_order: 3
          });
        }
        
        if (data.instagram_url) {
          socialNetworks.push({
            platform: 'Instagram',
            url: data.instagram_url,
            icon_name: 'Instagram',
            active: true,
            display_order: 4
          });
        }
        
        // Sort by display_order
        const processedSocialNetworks = socialNetworks.sort((a, b) => a.display_order - b.display_order);
        
        const processedData: ProcessedContactData = {
          cv_url: data.cv_url,
          cv_data: data.cv_data,
          social_networks: processedSocialNetworks
        };
        
        setContactData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading contact data');
        console.error('Error fetching contact data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return { contactData, loading, error };
}