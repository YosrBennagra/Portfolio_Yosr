import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeur Full-Stack'
    },
    company: {
      en: 'ITServ',
      fr: 'ITServ'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie'
    },
    startDate: '2025-02',
    endDate: 'present',
    logo: '/images/logos/itserv.png',
    isInternship: true,
    description: {
      en: 'Built the AI clinic assistant from start to finish. I followed CRISP-DM, cleaned the medical data, and fine-tuned T5-base with TensorFlow, scikit-learn, TRL, and Hugging Face Transformers, then kept a backup model on Hugging Face. I wrote Flask APIs served by Gunicorn, used MongoDB for vectors plus PostgreSQL for forum posts, auth, doctor ratings, and nested replies, and added a Mongo Atlas fallback. Admins can refresh embeddings through custom tools. The React UI covers patients, doctors, and admin flows, while Jenkins + SonarQube, unit tests, Grafana, and Prometheus keep each release safe.',
      fr: 'Créé l’assistant clinique IA de bout en bout. J’ai suivi CRISP-DM, nettoyé les données médicales et affiné T5-base avec TensorFlow, scikit-learn, TRL et Hugging Face Transformers, tout en gardant un modèle de secours sur Hugging Face. J’ai écrit les APIs Flask servies par Gunicorn, utilisé MongoDB pour les vecteurs et PostgreSQL pour le forum, l’auth, les notes médecins et les réponses imbriquées, avec secours Mongo Atlas. Les admins peuvent rafraîchir les embeddings via mes outils. L’interface React couvre patients, médecins et admin, et Jenkins + SonarQube, tests unitaires, Grafana et Prometheus sécurisent chaque livraison.'
    },
    highlights: {
      en: [
        'Cleaned medical data and fine-tuned T5-base with TensorFlow, scikit-learn, TRL, and Hugging Face.',
        'Built Flask APIs with MongoDB + PostgreSQL storage and Mongo Atlas fallback for RAG, forum, auth, and ratings.',
        'Shipped React UI plus Jenkins, SonarQube, unit tests, Grafana, and Prometheus for safe releases.'
      ],
      fr: [
        'Nettoyage des données médicales et fine-tuning de T5-base avec TensorFlow, scikit-learn, TRL et Hugging Face.',
        'APIs Flask avec stockage MongoDB + PostgreSQL et secours Mongo Atlas pour RAG, forum, auth et notes.',
        'Interface React livrée avec Jenkins, SonarQube, tests unitaires, Grafana et Prometheus pour des releases sûres.'
      ]
    },
    type: 'work'
  },
  {
    id: 'exp-2',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeur Full-Stack'
    },
    company: {
      en: 'IronByte',
      fr: 'IronByte'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie'
    },
    startDate: '2024-06',
    endDate: '2024-08',
    logo: '/images/logos/ironbyte.png',
    logoClassName: 'h-24 w-80 sm:w-96',
    isInternship: true,
    description: {
      en: 'Built a secure SaaS platform for schools that serves students, teachers, and administrators. Used Spring Boot + Angular to manage role-based access, timetable generation, lesson sharing, and class setup while keeping all APIs protected. Delivered a polished UI with PrimeNG, plus automated tests to keep every update solid.',
      fr: 'Créé une plateforme SaaS sécurisée pour les écoles couvrant élèves, enseignants et responsables. Utilisation de Spring Boot + Angular pour gérer les rôles, la génération d’emplois du temps, le partage de leçons et la création de classes avec des APIs protégées. UI soignée via PrimeNG et tests automatisés pour sécuriser chaque mise à jour.'
    },
    highlights: {
      en: [
        'Designed DAO/DTO layers with secure REST endpoints and PrimeNG UI.',
        'Automated timetables, class setup, and lesson sharing with role-based flows.',
        'Wrote unit and integration tests so schools could trust each release.'
      ],
      fr: [
        'Conception des couches DAO/DTO avec endpoints REST sécurisés et UI PrimeNG.',
        'Automatisation des emplois du temps, création de classes et partage de leçons selon les rôles.',
        'Tests unitaires et d’intégration pour inspirer confiance à chaque mise à jour.'
      ]
    },
    type: 'work'
  },
  {
    id: 'exp-3',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeur Full-Stack'
    },
    company: {
      en: 'Ooredoo Tunisie',
      fr: 'Ooredoo Tunisie'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie'
    },
    startDate: '2023-07',
    endDate: '2023-09',
    logo: '/images/logos/ooredoo.png',
    isInternship: true,
    description: {
      en: 'Built internal communication application with real-time chat, advanced filtering, and search capabilities. Delivered comprehensive UX/UI design and implemented unit and integration testing. Technologies: Spring Boot, Angular.',
      fr: 'Développé une application de communication interne avec chat en temps réel, filtrage avancé et recherche. Livraison de conception UX/UI complète et mise en œuvre de tests unitaires et d\'intégration. Technologies: Spring Boot, Angular.'
    },
    highlights: {
      en: [
        'Prototyped the UX/UI for the communication tool and built it with Angular.',
        'Implemented real-time chat, filters, and search on top of Spring Boot services.',
        'Added automated tests to protect future updates.'
      ],
      fr: [
        'Prototypage UX/UI de l’outil et réalisation sous Angular.',
        'Mise en place du chat temps réel, des filtres et de la recherche sur Spring Boot.',
        'Ajout de tests automatisés pour sécuriser les évolutions.'
      ]
    },
    type: 'work'
  },
  {
    id: 'exp-4',
    title: {
      en: 'Software Engineer Intern',
      fr: 'Stagiaire Ingénieur Logiciel'
    },
    company: {
      en: 'ITServ',
      fr: 'ITServ'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie'
    },
    startDate: '2021-06',
    endDate: '2021-08',
    logo: '/images/logos/itserv.png',
    isInternship: true,
    description: {
      en: 'Automated Excel-to-XML conversion for ITServ financial teams by shipping a Java desktop tool with Apache POI parsing, schema validation, and one-click exports that matched the client’s ERP ingestion rules.',
      fr: 'Automatisation de la conversion Excel vers XML pour les équipes financières d’ITServ via un outil Java (Apache POI) intégrant validation de schéma et export en un clic conforme aux règles d’ingestion ERP.'
    },
    highlights: {
      en: [
        'Built a Java desktop tool with Apache POI to parse large Excel files.',
        'Added schema validation plus one-click XML exports that matched ERP rules.'
      ],
      fr: [
        'Création d’un outil Java avec Apache POI pour traiter de gros fichiers Excel.',
        'Ajout de la validation de schéma et d’exports XML en un clic conformes aux règles ERP.'
      ]
    },
    type: 'work'
  },
  {
    id: 'edu-1',
    title: {
      en: 'Bachelor of Engineering',
      fr: 'Licence en Ingénierie'
    },
    company: {
      en: 'ESPRIT — Private Higher School of Engineering and Technology',
      fr: 'ESPRIT — École Supérieure Privée d\'Ingénierie et de Technologie'
    },
    location: {
      en: 'Tunis, Tunisia',
      fr: 'Tunis, Tunisie'
    },
    startDate: '2020-09',
    endDate: '2025-06',
    logo: '/images/logos/esprit.png',
    logoClassName: 'h-14 w-48 sm:w-64',
    description: {
      en: 'Specialized in Web and Internet Technology and graduated in June 2025. I worked with cross-discipline teams to ship a collaborative document application, a construction management desktop application with modern web stacks.',
      fr: 'Spécialisé en Technologie Web et Internet et diplômé en juin 2025. J\'ai travaillé avec des équipes pluridisciplinaires pour livrer une suite documentaire collaborative, une plateforme de gestion de chantier et des outils d\'apprentissage intelligents avec des stacks web modernes.'
    },
    highlights: {
      en: [
        'Worked with student squads that kept scope and delivery clear for everyone.',
        'Co-built collaborative document, construction, and education apps with modern web stacks.'
      ],
      fr: [
        'Travail avec des équipes étudiantes en gardant un scope clair pour toutes et tous.',
        'Co-création d’applis collaboratives, de construction et d’éducation avec des stacks web modernes.'
      ]
    },
    type: 'education'
  }
];
