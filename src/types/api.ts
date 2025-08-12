export interface AboutData {
  id: string;
  name: string;
  profession: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  cv_url?: string;
}

export interface Skill {
  id: string;
  name: string;
  type: 'technical' | 'interpersonal';
  level?: number;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  github_url: string;
  demo_url?: string;
  technologies: string[];
  image_url?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  location: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  start_date: string;
  end_date?: string;
  location: string;
  description?: string;
  courses?: string[];
  gpa?: string;
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