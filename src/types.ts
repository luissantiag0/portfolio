export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level: number; // 0-100 indicating confidence
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  challenges: string;
  solution: string;
  role: string;
  category: 'web-app' | 'backend' | 'java-desktop' | 'game';
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageAccent: string; // Tailwind gradient classes
  imageUrl?: string;
  imagePlaceholderUrl?: string;
}

export interface ExperienceMile {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface AcademicModule {
  name: string;
  code: string;
  hours?: number;
  highlight: string;
  completed: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
