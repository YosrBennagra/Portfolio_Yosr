import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: {
      en: 'AI-Powered Healthcare Platform',
      fr: 'Plateforme de Santé avec IA',
      ar: 'منصة رعاية صحية مدعومة بالذكاء الاصطناعي'
    },
    description: {
      en: 'Full-stack healthcare platform with AI symptom checker, doctor blog, patient forum, and admin dashboard. Integrated fine-tuned AI models with RAG technology and implemented complete CI/CD pipeline.',
      fr: 'Plateforme de santé full-stack avec vérificateur de symptômes IA, blog médical, forum patients et tableau de bord admin. Intégration de modèles IA affinés avec technologie RAG et pipeline CI/CD complet.',
      ar: 'منصة رعاية صحية متكاملة مع مدقق أعراض بالذكاء الاصطناعي ومدونة طبية ومنتدى للمرضى ولوحة تحكم إدارية. تكامل نماذج ذكاء اصطناعي محسنة مع تقنية RAG وخط أنابيب CI/CD كامل.'
    },
    image: '/images/projects/healthcare.jpg',
    tags: ['React', 'Flask', 'MongoDB', 'Python', 'Hugging Face', 'Docker', 'Jenkins', 'AI/ML'],
    category: 'fullstack',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    featured: true
  },
  {
    id: 'project-2',
    title: {
      en: 'Shape Blaster — Mobile Game',
      fr: 'Shape Blaster — Jeu Mobile',
      ar: 'Shape Blaster — لعبة موبايل'
    },
    description: {
      en: '2D puzzle game where players strategically place shapes to clear horizontal and vertical lines. Features dynamic shape spawning system and engaging gameplay mechanics built with Unity and C#.',
      fr: 'Jeu de puzzle 2D où les joueurs placent stratégiquement des formes pour effacer des lignes horizontales et verticales. Système de génération de formes dynamique et mécaniques de jeu engageantes avec Unity et C#.',
      ar: 'لعبة ألغاز ثنائية الأبعاد حيث يضع اللاعبون الأشكال بشكل استراتيجي لمسح الخطوط الأفقية والعمودية. نظام توليد أشكال ديناميكي وآليات لعب جذابة مبنية بـ Unity و C#.'
    },
    image: '/images/projects/shapeblaster.jpg',
    tags: ['Unity', 'C#', 'Mobile Development', 'Game Design'],
    category: 'mobile',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    featured: true
  },
  {
    id: 'project-3',
    title: {
      en: 'Educational Platform with Timetable Tool',
      fr: 'Plateforme Éducative avec Outil de Planning',
      ar: 'منصة تعليمية مع أداة جدولة'
    },
    description: {
      en: 'Web application for assignment submission, lesson sharing, and automated timetable creation. Improved scheduling efficiency by 40% with intelligent scheduling algorithms.',
      fr: 'Application web pour la soumission de devoirs, le partage de leçons et la création automatisée d\'emplois du temps. Amélioration de l\'efficacité de planification de 40% avec des algorithmes intelligents.',
      ar: 'تطبيق ويب لتقديم الواجبات ومشاركة الدروس وإنشاء جدول زمني تلقائي. تحسين كفاءة الجدولة بنسبة 40٪ مع خوارزميات جدولة ذكية.'
    },
    image: '/images/projects/education.jpg',
    tags: ['NestJS', 'React', 'MongoDB', 'TypeScript', 'JavaScript'],
    category: 'fullstack',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    featured: true
  },
  {
    id: 'project-4',
    title: {
      en: 'Collaborative Document Platform',
      fr: 'Plateforme de Documents Collaboratifs',
      ar: 'منصة مستندات تعاونية'
    },
    description: {
      en: 'Notion-like application with real-time collaboration, document sharing across groups, and automated testing. Built with React, TypeScript, NestJS, WebSockets, and deployed via GitHub Actions.',
      fr: 'Application type Notion avec collaboration en temps réel, partage de documents entre groupes et tests automatisés. Développée avec React, TypeScript, NestJS, WebSockets et déployée via GitHub Actions.',
      ar: 'تطبيق شبيه بـ Notion مع تعاون في الوقت الفعلي ومشاركة المستندات عبر المجموعات واختبار آلي. مبني بـ React و TypeScript و NestJS و WebSockets ونشر عبر GitHub Actions.'
    },
    image: '/images/projects/collaboration.jpg',
    tags: ['React', 'TypeScript', 'NestJS', 'WebSockets', 'Jest', 'GitHub Actions'],
    category: 'fullstack',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    featured: false
  },
  {
    id: 'project-5',
    title: {
      en: 'Internal Communication App',
      fr: 'Application de Communication Interne',
      ar: 'تطبيق اتصالات داخلية'
    },
    description: {
      en: 'Real-time chat application for internal company communications with advanced filtering, search capabilities, and comprehensive UX/UI design. Includes unit and integration testing.',
      fr: 'Application de chat en temps réel pour les communications internes de l\'entreprise avec filtrage avancé, capacités de recherche et conception UX/UI complète. Comprend des tests unitaires et d\'intégration.',
      ar: 'تطبيق دردشة في الوقت الفعلي للاتصالات الداخلية للشركة مع تصفية متقدمة وقدرات بحث وتصميم UX/UI شامل. يتضمن اختبارات وحدة وتكامل.'
    },
    image: '/images/projects/chat.jpg',
    tags: ['Spring Boot', 'Angular', 'Java', 'TypeScript', 'WebSockets'],
    category: 'fullstack',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    featured: false
  },
  {
    id: 'project-6',
    title: {
      en: 'Construction Management System',
      fr: 'Système de Gestion de Construction',
      ar: 'نظام إدارة البناء'
    },
    description: {
      en: 'Desktop application for construction company managing inventory, staff, materials, and deliveries. Built with Qt and C++ for optimal performance and reliability.',
      fr: 'Application de bureau pour entreprise de construction gérant l\'inventaire, le personnel, les matériaux et les livraisons. Développée avec Qt et C++ pour des performances optimales.',
      ar: 'تطبيق سطح مكتب لشركة بناء لإدارة المخزون والموظفين والمواد والتسليمات. مبني بـ Qt و C++ للأداء الأمثل والموثوقية.'
    },
    image: '/images/projects/construction.jpg',
    tags: ['Qt', 'C++', 'Desktop App', 'Database Management'],
    category: 'web',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    featured: false
  }
];
