export type LocalizedString = {
  en: string;
  fr: string;
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
    devopsDemo?: string;
    report?: string;
    reportDownload?: string;
    presentation?: string;
    github?: string;
  };
  gallery?: string[];
  showPlaceholder?: boolean;
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
  logo?: string;
  logoClassName?: string;
  isInternship?: boolean;
  highlights?: {
    en: string[];
    fr: string[];
  };
};

export type Certificate = {
  id: string;
  title: LocalizedString;
  issuer: LocalizedString;
  description: LocalizedString;
  issueDate?: string;
  credentialUrl: string;
  asset?: string;
  preview?: string;
  previewType?: 'image' | 'pdf';
  tags?: string[];
  badge?: string;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};
