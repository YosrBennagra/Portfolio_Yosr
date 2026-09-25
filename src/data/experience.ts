import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-wico',
    title: {
      en: 'Senior Java & Angular Full Stack Developer',
      fr: 'Développeur Full Stack Senior Java & Angular'
    },
    company: {
      en: 'WICO Technology – SoluBat',
      fr: 'WICO Technology – SoluBat'
    },
    location: {
      en: 'Tunis, Tunisia',
      fr: 'Tunis, Tunisie'
    },
    startDate: '2020-10',
    endDate: 'present',
    note: {
      en: 'Part-time during studies (2020–2025), full-time since 2025',
      fr: 'Temps partiel pendant les études (2020–2025), plein temps depuis 2025'
    },
    description: {
      en: 'Part-time during studies (2020–2025), full-time since 2025',
      fr: 'Temps partiel pendant les études (2020–2025), plein temps depuis 2025'
    },
    highlights: {
      en: [
        'Own end-to-end delivery on a production building-management ERP: 1,000+ users, 10+ business modules (inventory, project costing, quotations, HR, maintenance).',
        'Spring Boot services and REST APIs with Spring Data JPA/Hibernate and PostgreSQL; Spring Security with JWT and RBAC.',
        'Angular/TypeScript frontends with RxJS, Reactive Forms and reusable components.',
        '~40% faster slow screens and reports (SQL and index tuning) · ~30% fewer backend calls per screen (batching and caching).',
        '~70% test coverage on core modules (JUnit, Mockito) · ~25% fewer repeat production incidents through root-cause fixes.',
        'Work directly with the client; review code and mentor developers in two-week Agile sprints.'
      ],
      fr: [
        'Livraison de bout en bout sur un ERP de gestion de bâtiment en production : plus de 1 000 utilisateurs, plus de 10 modules métier (inventaire, chiffrage de projets, devis, RH, maintenance).',
        'Services Spring Boot et APIs REST avec Spring Data JPA/Hibernate et PostgreSQL ; Spring Security avec JWT et RBAC.',
        'Frontends Angular/TypeScript avec RxJS, Reactive Forms et composants réutilisables.',
        'Écrans et rapports lents environ 40 % plus rapides (réglage SQL et des index) · environ 30 % d’appels backend en moins par écran (regroupement et cache).',
        'Environ 70 % de couverture de tests sur les modules cœur (JUnit, Mockito) · environ 25 % d’incidents de production récurrents en moins grâce aux corrections de cause racine.',
        'Travail direct avec le client ; revue de code et mentorat de développeurs dans des sprints Agile de deux semaines.'
      ]
    },
    type: 'work'
  },
  {
    id: 'edu-esprit',
    title: {
      en: 'Software Engineering Degree',
      fr: "Diplôme d'ingénierie logicielle"
    },
    company: {
      en: 'ESPRIT',
      fr: 'ESPRIT'
    },
    location: {
      en: 'Tunis, Tunisia',
      fr: 'Tunis, Tunisie'
    },
    startDate: '2019-09',
    endDate: '2025-10',
    logo: '/images/logos/esprit.png',
    logoClassName: 'h-14 w-48 sm:w-64',
    description: {
      en: 'ESPRIT, Software Engineering Degree, Sep 2019 – Oct 2025.',
      fr: "ESPRIT – Diplôme d'ingénierie logicielle, sept. 2019 – oct. 2025."
    },
    highlights: {
      en: [
        'Software engineering studies at ESPRIT, Sep 2019 – Oct 2025, alongside part-time work at WICO Technology.'
      ],
      fr: [
        "Études d'ingénierie logicielle à ESPRIT, sept. 2019 – oct. 2025, en parallèle d'un temps partiel chez WICO Technology."
      ]
    },
    type: 'education'
  }
];
