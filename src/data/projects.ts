import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-veinpal',
    title: {
      en: 'Veinpal',
      fr: 'Veinpal'
    },
    period: {
      en: 'Personal product · Jan 2026 – Present',
      fr: 'Produit personnel · janv. 2026 – Présent'
    },
    description: {
      en: 'My own software platform of web and desktop tools, built alongside my full-time job. I own architecture, implementation, testing, CI/CD and releases end to end.',
      fr: "Ma propre plateforme d'outils web et desktop, construite en parallèle de mon poste à plein temps. J'assure l'architecture, l'implémentation, les tests, le CI/CD et les mises en production de bout en bout."
    },
    tags: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'CI/CD'],
    category: 'web',
    links: {
      demo: 'https://veinpal.com/apps'
    },
    showPlaceholder: true,
    featured: true
  },
  {
    id: 'project-geticonfav',
    title: {
      en: 'GetIconFav',
      fr: 'GetIconFav'
    },
    period: {
      en: 'Personal project (part of Veinpal) · 2026',
      fr: 'Projet personnel (dans Veinpal) · 2026'
    },
    description: {
      en: 'Free online favicon.ico generator: drag in an image, preview it in every context, download. Open source (MIT) with GitHub Actions CI and deploy workflows.',
      fr: 'Générateur gratuit de favicon.ico en ligne : glissez une image, prévisualisez-la dans chaque contexte, téléchargez. Open source (MIT), avec une CI GitHub Actions et des workflows de déploiement.'
    },
    tags: ['React', 'TypeScript', 'GitHub Actions'],
    category: 'web',
    links: {
      demo: 'https://gifav.veinpal.com',
      github: 'https://github.com/YosrBennagra/GetIconFav'
    },
    showPlaceholder: true,
    featured: true
  },
  {
    id: 'project-allyourtypes',
    title: {
      en: 'AllYourTypes',
      fr: 'AllYourTypes'
    },
    period: {
      en: 'Personal project (part of Veinpal) · 2026',
      fr: 'Projet personnel (dans Veinpal) · 2026'
    },
    description: {
      en: "Free file converter for images, video and audio that runs entirely in the browser with FFmpeg.wasm, so files never leave the user's machine. Open source (MIT).",
      fr: "Convertisseur gratuit d'images, de vidéo et d'audio qui s'exécute entièrement dans le navigateur avec FFmpeg.wasm, de sorte que les fichiers ne quittent jamais la machine de l'utilisateur. Open source (MIT)."
    },
    tags: ['React', 'TypeScript', 'FFmpeg.wasm'],
    category: 'web',
    links: {
      demo: 'https://allurtypes.veinpal.com',
      github: 'https://github.com/YosrBennagra/AllYourTypes'
    },
    showPlaceholder: true,
    featured: true
  },
  {
    id: 'project-housing',
    title: {
      en: 'University housing microservices',
      fr: 'Microservices de logement universitaire'
    },
    period: {
      en: 'Academic project, ESPRIT · 2023',
      fr: 'Projet académique, ESPRIT · 2023'
    },
    description: {
      en: 'Course project for a distributed web application that manages student housing (residences, blocks, rooms, reservations, students). It is split into Spring Boot 3 / Java 17 microservices behind a Spring Cloud API Gateway with Eureka service discovery, uses Keycloak for authentication and MySQL databases, and runs with Docker Compose.',
      fr: "Projet de cours pour une application web distribuée qui gère le logement étudiant (résidences, blocs, chambres, réservations, étudiants). Elle est découpée en microservices Spring Boot 3 / Java 17 derrière une API Gateway Spring Cloud avec découverte de services Eureka, utilise Keycloak pour l'authentification et des bases MySQL, et tourne avec Docker Compose."
    },
    tags: ['Java 17', 'Spring Boot 3', 'Spring Cloud', 'Keycloak', 'Docker'],
    category: 'fullstack',
    links: {
      github: 'https://github.com/YosrBennagra/App-web-destribue'
    },
    showPlaceholder: true,
    featured: true
  }
];
