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
      en: "Graduation project for ITServ that delivers an AI assistant able to analyse symptoms. Drove CRISP-DM research, dataset curation/cleaning, and multi-model fine-tuning until T5-base produced the best recall, then exposed it through Flask microservices with a RAG knowledge base. Built the React front end with auth/registration, forum + blog with likes and nested replies, admin workspaces, and a RAG dashboard where editors inject new medical articles for richer answers.",
      fr: "Projet de fin d'études pour ITServ offrant un assistant IA capable d'analyser les symptômes. Pilotage de la recherche CRISP-DM, de la sélection/nettoyage des jeux de données et du fine-tuning de plusieurs modèles jusqu'à ce que T5-base délivre la meilleure précision, puis exposition via des microservices Flask avec base de connaissances RAG. Réalisation du front-end React avec auth/inscription, forum + blog (likes, réponses imbriquées), espaces admin et tableau de bord RAG permettant d'injecter de nouveaux articles médicaux pour enrichir les réponses.",
      ar: "مشروع التخرج لدى ITServ يقدّم مساعدًا ذكيا يحلل الأعراض. قدت مراحل CRISP-DM من البحث العلمي وجمع البيانات وتنظيفها وتعديل عدة نماذج حتى حقق T5-base أفضل الدقة، ثم نشرته عبر خدمات Flask المصغرة مع قاعدة معرفة RAG. أنشأت الواجهة الأمامية بـ React مع التسجيل وتسجيل الدخول، ومنتدى ومدونة بإعجابات وردود متداخلة، ومساحات إدارة، ولوحة تحكم RAG لإضافة المقالات الطبية وتحسين الإجابات."
    },
    image: '/images/projects/ai-health-home.png',
    gallery: [
      '/images/projects/ai-health-home.png',
      '/images/projects/ai-health-doctor.png',
      '/images/projects/ai-health-record.png',
      '/images/projects/ai-health-bodymap.png',
      '/images/projects/ai-health-bodymap-loading.png',
      '/images/projects/ai-health-manual.png',
      '/images/projects/ai-health-question.png',
      '/images/projects/ai-health-questions.png',
      '/images/projects/ai-health-nav.png',
      '/images/projects/ai-health-symptom.png',
      '/images/projects/ai-health-disease.png',
      '/images/projects/ai-health-theme.png'
    ],
    tags: ['React', 'Flask', 'MongoDB', 'Python', 'Hugging Face', 'Docker', 'Jenkins', 'AI/ML'],
    category: 'fullstack',
    links: {
      demo: '/media/demo-app.mov',
      devopsDemo: '/media/demo-devops.mp4',
      report: '/pfe-report.pdf',
      reportDownload: '/pfe-report.pdf',
      github: 'https://github.com/YosrBennagra'
    },
    showPlaceholder: false,
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
      en: 'Block-Blast-inspired puzzle where players slot shapes into an 8x8 grid to clear rows/columns. Built in Unity C# with dynamic piece spawning, hold queue, and tactile particles; core loop is playable while larger narrative/monetization ideas remain in progress.',
      fr: 'Puzzle inspiré de Block Blast où les joueurs positionnent des formes dans une grille 8×8 pour nettoyer lignes et colonnes. Développé sous Unity/C# avec génération dynamique, file d’attente de pièces et particules tactiles; la boucle principale est jouable mais la vision complète (narration/monétisation) est encore en cours.',
      ar: 'لعبة ألغاز مستوحاة من Block Blast حيث تضع الأشكال داخل شبكة 8×8 لمسح الصفوف والأعمدة. مبنية بمحرك Unity و C# مع توليد ديناميكي للقطع وقائمة انتظار وتأثيرات بصرية؛ الحلقة الأساسية قابلة للعبة بينما ما زال العمل جارياً على الفكرة الكبيرة.'
    },
    image: '/images/projects/shapeblaster.jpg',
    tags: ['Unity', 'C#', 'Mobile Development', 'Game Design'],
    category: 'mobile',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    showPlaceholder: true,
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
    showPlaceholder: true,
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
    showPlaceholder: true,
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
      en: 'Internal communication suite built during the Ooredoo internship. Architected Spring Boot services with DAO/DTO layers, secure REST endpoints, and Angular + PrimeNG front end delivering real-time chat, advanced filtering/search, and admin tooling backed by thorough unit/integration tests.',
      fr: 'Suite de communication interne développée pendant le stage chez Ooredoo. Architecture Spring Boot avec couches DAO/DTO, endpoints REST sécurisés et front-end Angular + PrimeNG offrant chat temps réel, filtrage/recherche avancés et outils admin complétés par des tests unitaires/intégration.',
      ar: 'منصة اتصالات داخلية طورتها خلال تدريب Ooredoo. صممت خدمات Spring Boot مع طبقات DAO/DTO ونقاط REST آمنة وواجهة Angular + PrimeNG توفر دردشة فورية وتصفية وبحث متقدم وأدوات إدارية مدعومة باختبارات وحدة وتكامل.'
    },
    image: '/images/projects/chat.jpg',
    tags: ['Spring Boot', 'Angular', 'Java', 'TypeScript', 'WebSockets'],
    category: 'fullstack',
    links: {
      github: 'https://github.com/YosrBennagra'
    },
    showPlaceholder: true,
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
    showPlaceholder: true,
    featured: false
  }
];
