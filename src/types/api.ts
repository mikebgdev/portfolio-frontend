export interface AboutData {
  id: number;
  name: string;
  last_name: string;
  birth_month: number;
  birth_year: number;
  email: string;
  location: string;
  photo_url: string;
  bio_en: string;
  bio_es: string;
  extra_content_en: string;
  extra_content_es: string;
  nationality_en: string;
  nationality_es: string;
  created_at: string;
  updated_at: string;
  language: string;
  available_languages: string[];
}

export interface Skill {
  id: number;
  name: string;
  type: 'technical' | 'interpersonal';
  level?: number;
  category?: string;
  language: string;
  available_languages: string[];
}

export interface Project {
  id: number;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  image_url?: string;
  technologies: string;
  source_url?: string;
  demo_url?: string;
  display_order: number;
  activa: boolean;
  created_at: string;
  language: string;
  available_languages: string[];
}

export interface Experience {
  id: number;
  company: string;
  position_en: string;
  position_es: string;
  description_en: string;
  description_es: string;
  start_date: string;
  end_date?: string;
  location: string;
  display_order: number;
  activo: boolean;
  created_at: string;
  language: string;
  available_languages: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree_en: string;
  degree_es: string;
  field_of_study_en: string;
  field_of_study_es: string;
  description_en: string;
  description_es: string;
  start_date: string;
  end_date?: string;
  location: string;
  display_order: number;
  activo: boolean;
  created_at: string;
  language: string;
  available_languages: string[];
}

export interface ContactData {
  id: number;
  email: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  contact_form_enabled: boolean;
  contact_message_en: string;
  contact_message_es: string;
  cv_file_url?: string;
  created_at: string;
  updated_at: string;
  language: string;
  available_languages: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}