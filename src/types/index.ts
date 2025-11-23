export type LocalizedString = {
  en: string;
  fr: string;
  ar: string;
};

export type Project = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'fullstack';
  links: {
    demo?: string;
    github?: string;
  };
  featured?: boolean;
};

export type Skill = {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  level: number;
  icon?: string;
};

export type Experience = {
  id: string;
  title: LocalizedString;
  company: LocalizedString;
  location: LocalizedString;
  startDate: string;
  endDate: string | 'present';
  description: LocalizedString;
  type: 'work' | 'education';
};

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};
