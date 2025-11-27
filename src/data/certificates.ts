import { Certificate } from '@/types';

export const certificates: Certificate[] = [
  {
    id: 'cert-saylor-cpp',
    title: {
      en: 'CS107: C++ Programming',
      fr: 'CS107 : Programmation C++'
    },
    issuer: {
      en: 'Saylor Academy',
      fr: 'Saylor Academy'
    },
    description: {
      en: 'Accredible-backed credential covering modern C++ syntax, STL containers, file I/O, exception safety, and object-oriented design.',
      fr: 'Certificat Accredible couvrant la syntaxe C++ moderne, les conteneurs STL, l’I/O fichier, la gestion des exceptions et la conception orientée objet.'
    },
    issueDate: '2022-02-06',
    credentialUrl: 'https://certificates.saylor.org/2af3284e-fd1b-4cce-b8ee-ab87607b730c',
    asset: '/assets/certificates/cs107-cpp.pdf',
    preview: '/assets/certificates/cs107-cpp.pdf',
    previewType: 'pdf',
    tags: ['C++', 'Accredible'],
    badge: 'Accredible'
  },
  {
    id: 'cert-bcdiploma',
    title: {
      en: 'BCdiploma Verifiable Credential',
      fr: 'Attestation vérifiable BCdiploma'
    },
    issuer: {
      en: 'BCdiploma',
      fr: 'BCdiploma'
    },
    description: {
      en: 'Blockchain-secured certificate issued via BCdiploma with tamper-proof QR verification for academic records.',
      fr: 'Certificat sécurisé sur blockchain via BCdiploma avec vérification instantanée par QR pour les relevés académiques.'
    },
    credentialUrl: 'https://certificate.bcdiploma.com/check/3AA00FBCF0A197B14B80C1FC309080EEA822351F3C2E079BA08F69EF3DDF1050d2ZZbDczMml3SzBuTGhzVU9KVUNzNld0aDk1ZjZmNE5rNnFrYlNtRXJzNkRCYkxU',
    asset: '/assets/certificates/honoris-sustainability.pdf',
    preview: '/assets/certificates/honoris-sustainability.pdf',
    previewType: 'pdf',
    tags: ['Blockchain', 'QR'],
    badge: 'BCdiploma'
  },
  {
    id: 'cert-hashgraph',
    title: {
      en: 'Hashgraph Developer Program',
      fr: 'Programme développeur Hashgraph'
    },
    issuer: {
      en: 'Hedera / Hashgraph Dev',
      fr: 'Hedera / Hashgraph Dev'
    },
    description: {
      en: 'Hands-on credential covering Hedera Hashgraph architecture, consensus services, tokenization workflows, and smart-contract deployment.',
      fr: 'Attestation pratique sur Hedera Hashgraph couvrant l’architecture, les services de consensus, la tokenisation et le déploiement de smart contracts.'
    },
    credentialUrl: 'https://certs.hashgraphdev.com/bfe61ba1-b77f-4ed8-9187-9754b75cfaf7.pdf',
    asset: '/assets/certificates/hashgraph-dev.pdf',
    preview: '/assets/certificates/hashgraph-dev.pdf',
    previewType: 'pdf',
    tags: ['Hedera', 'Web3'],
    badge: 'Hashgraph Dev'
  },
  {
    id: 'cert-mongodb-rag',
    title: {
      en: 'Building RAG Apps Using MongoDB',
      fr: 'Construction d\'applications RAG avec MongoDB'
    },
    issuer: {
      en: 'MongoDB',
      fr: 'MongoDB'
    },
    description: {
      en: 'Credential covering Retrieval-Augmented Generation architecture, vector search with MongoDB Atlas, embedding strategies, and building production-ready RAG applications.',
      fr: 'Certificat couvrant l\'architecture RAG (Retrieval-Augmented Generation), la recherche vectorielle avec MongoDB Atlas, les stratégies d\'embedding et la création d\'applications RAG en production.'
    },
    issueDate: '2025-11-27',
    credentialUrl: 'https://www.credly.com/badges/6caba301-8d68-465e-acc5-d6690864fd16',
    asset: '/assets/certificates/RAG with mongoDB.pdf',
    preview: '/assets/certificates/RAG with mongoDB.pdf',
    previewType: 'pdf',
    tags: ['MongoDB', 'AI', 'RAG', 'Vector Search'],
    badge: 'Credly'
  }
];
