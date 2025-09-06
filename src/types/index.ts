// Shared TypeScript interfaces for the portfolio application

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  year: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured: boolean;
  metrics: {
    performance: string;
    users: string;
    impact: string;
  };
  caseStudy: {
    problem: string;
    solution: string;
    results: string[];
  };
  features?: {
    userModule?: string[];
    ownerModule?: string[];
    adminModule?: string[];
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  impact: string;
  technologies?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ContactInfo {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  avatar: string;
  stats: {
    experience: string;
    projects: string;
    clients: string;
  };
  skills: string[];
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      type?: string;
      stiffness?: number;
      delayChildren?: number;
      staggerChildren?: number;
      duration?: number;
    };
  };
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  success?: boolean;
}

export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Filter types
export type ProjectCategory = 'all' | 'Web Application' | 'Mobile App' | 'VR/AR' | 'Developer Tools' | 'IoT/Robotics' | 'AI/ML';