
export type Theme = 'light' | 'dark';

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  media: ProjectMedia[];
  tags: string[];
  link?: string;
}

export interface SkillItem {
  name: string;
  level: number;
  description: string;
  icon?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}
