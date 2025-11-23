import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeuse Full-Stack'
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
      en: 'Graduation internship at ITServ leading the CRISP-DM cycle for an AI symptom analyst. Researched medical corpora, cleaned bespoke datasets, benchmarked multiple models, and fine-tuned T5-base with RAG-ready embeddings hosted behind Flask microservices. Built the React front-end with auth/registration, community forum with likes and nested replies, editorial blog, admin dashboards, and a RAG knowledge console for curating new articles.',
      fr: 'Projet de fin d’études chez ITServ en pilotant la méthodologie CRISP-DM pour un analyseur de symptômes basé sur l’IA. Recherche de corpus médicaux, nettoyage de jeux de données dédiés, comparaison de plusieurs modèles puis fine-tuning de T5-base avec embeddings compatibles RAG exposés via des microservices Flask. Réalisation du front-end React avec authentification/inscription, forum communautaire avec likes et réponses imbriquées, blog éditorial, tableaux de bord admin et console RAG pour enrichir les articles.'
    },
    type: 'work'
  },
  {
    id: 'exp-2',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeuse Full-Stack'
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
    logo: '/images/logos/ironbyte.jpg',
    logoClassName: 'h-12 w-40 sm:w-48',
    isInternship: true,
    description: {
      en: 'Built the internal communication platform at Ooredoo using Spring Boot + Angular. Applied DAO/DTO layering, PrimeNG components, and secure REST patterns to ship real-time chat with advanced filtering/search plus admin tooling. Strengthened QA with unit/integration tests while collaborating with product squads.',
      fr: 'Réalisé la plateforme de communication interne chez Ooredoo avec Spring Boot et Angular. Mise en œuvre des couches DAO/DTO, des composants PrimeNG et de patterns REST sécurisés pour livrer un chat temps réel avec filtrage/recherche avancés et outils admin. Renforcé la QA via tests unitaires et d’intégration en équipe produit.'
    },
    type: 'work'
  },
  {
    id: 'exp-3',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeuse Full-Stack'
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
    type: 'work'
  },
  {
    id: 'exp-4',
    title: {
      en: 'Software Engineer Intern',
      fr: 'Stagiaire Ingénieure Logiciel'
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
    logoClassName: 'h-10 w-32 sm:w-40',
    description: {
      en: 'Specialization in Web and Internet Technology. Completed multiple team projects including collaborative document platform, construction management system, and educational applications. Expected graduation: June 2025.',
      fr: 'Spécialisation en Technologie Web et Internet. Réalisation de plusieurs projets d\'équipe incluant plateforme de documents collaboratifs, système de gestion de construction et applications éducatives. Diplôme prévu: Juin 2025.'
    },
    type: 'education'
  }
];
