import React, { createContext, useContext, useState, useEffect } from 'react';
import { aboutService } from '@/services/api';
import { ProcessedAboutData, ContactInfo, ProcessedHeroData } from '@/types/api';
import { useTranslation } from 'react-i18next';
import { processTextContent } from '@/utils';

interface AboutContextType {
  aboutData: ProcessedAboutData | null;
  heroData: ProcessedHeroData | null;
  contactInfo: ContactInfo[];
  loading: boolean;
  error: string | null;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export const AboutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aboutData, setAboutData] = useState<ProcessedAboutData | null>(null);
  const [heroData, setHeroData] = useState<ProcessedHeroData | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

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
        const heroDescription = currentLang === 'es' ? data.hero_description_es : data.hero_description_en;
        
        // Process bio using utility function
        const bioArray = processTextContent(bio);
        
        const processedAboutData: ProcessedAboutData = {
          full_name: `${data.name} ${data.last_name}`,
          title: jobTitle,
          image_url: data.photo_data?.data || data.photo_url,
          description: bioArray
        };
        
        const processedHeroData: ProcessedHeroData = {
          name: data.name,
          last_name: data.last_name,
          full_name: `${data.name} ${data.last_name}`,
          hero_description: heroDescription
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
        
        setAboutData(processedAboutData);
        setHeroData(processedHeroData);
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

  return (
    <AboutContext.Provider value={{ aboutData, heroData, contactInfo, loading, error }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useSharedAboutData = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useSharedAboutData must be used within an AboutProvider');
  }
  return context;
};