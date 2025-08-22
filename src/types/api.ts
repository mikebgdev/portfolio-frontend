// API Response Types

export interface FileData {
  data: string; // Base64 data URL
  mime_type: string;
  size: number;
  filename: string;
}

export interface SiteConfig {
  site_title: string;
  brand_name: string;
  meta_description: string;
  meta_keywords: string;
  favicon_file: string | null;
  og_title: string;
  og_description: string;
  og_image_file: string | null;
  og_url: string | null;
  og_type: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image_file: string | null;
  favicon_data?: FileData;
  og_image_data?: FileData;
  twitter_image_data?: FileData;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface AboutProfile {
  name: string;
  last_name: string;
  birth_date: string;
  email: string;
  location: string;
  photo_url: string;
  photo_data?: FileData;
  bio_en: string;
  bio_es: string;
  hero_description_en: string;
  hero_description_es: string;
  job_title_en: string;
  job_title_es: string;
  nationality_en: string;
  nationality_es: string;
  id: number;
  created_at: string;
  updated_at: string;
  language: string;
  available_languages: string[];
}

// Derived types for frontend use
export interface ProcessedAboutData {
  full_name: string;
  title: string;
  image_url: string;
  description: string[];
}

export interface ProcessedHeroData {
  name: string;
  last_name: string;
  full_name: string;
  hero_description: string;
}

export interface ContactInfo {
  type: 'email' | 'location';
  value: string;
  link: string;
}

// Skills API Types
export interface SkillItem {
  name: string;
  icon_name: string;
  color: string | null;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon_name: string;
  skills: SkillItem[];
}

export interface SkillsResponse {
  categories: SkillCategory[];
}

// Experience API Types
export interface ExperienceItem {
  company: string;
  position_en: string;
  position_es: string;
  description_en: string;
  description_es: string;
  start_date: string;
  end_date: string | null;
  location: string;
  display_order: number;
  activo: boolean;
  id: number;
  created_at: string;
  language: string;
  available_languages: string[];
}

export type ExperienceResponse = ExperienceItem[];

// Processed experience data for frontend use
export interface ProcessedExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

// Projects API Types
export interface ProjectItem {
  id: number;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  image_url: string;
  image_data?: FileData;
  technologies: string[] | string;
  source_url: string;
  demo_url: string | null;
  display_order: number;
  activa: boolean;
  created_at: string;
  language: string;
}

export type ProjectsResponse = ProjectItem[];

// Processed project data for frontend use
export interface ProcessedProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

// Education API Types
export interface EducationItem {
  id: number;
  institution: string;
  location: string;
  degree_en: string;
  degree_es: string;
  start_date: string;
  end_date: string;
  display_order: number;
  activo: boolean;
  created_at: string;
  language: string;
}

export type EducationResponse = EducationItem[];

// Processed education data for frontend use
export interface ProcessedEducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

// Contact API Types
export interface SocialNetwork {
  platform: string;
  url: string;
  icon_name: string;
  active: boolean;
  display_order: number;
}

export interface ContactResponse {
  cv_url: string | null;
  cv_data?: FileData;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  social_networks?: SocialNetwork[];
}

// Processed contact data for frontend use
export interface ProcessedContactData {
  cv_url: string | null;
  cv_data?: FileData;
  social_networks: SocialNetwork[];
}