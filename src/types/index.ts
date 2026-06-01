// File: src/types/index.ts

export interface Project {
  number: string;
  name: string;
  type: 'Live Project' | 'Case Study' | 'Open Source' | 'Freelance';
  year: string;
  description: string;
  tech: string[];
  projectUrl: string | null;
  sourceUrl?: string | null;
  images: string[];
  showProjectLink: boolean;
}

export interface SkillRow {
  items: string[];
  direction: 'left' | 'right';
  speed: 'slow' | 'medium' | 'fast';
}

export interface NavItem {
  label: string;
  href: string; // anchor ID: '#hero', '#about', '#work', '#stack', '#contact'
}

export interface Social {
  label: string;
  url: string;
  icon: 'linkedin' | 'github' | 'mail';
}

export interface Capability {
  number: string;
  title: string;
  description: string;
}
