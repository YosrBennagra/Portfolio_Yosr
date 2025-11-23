import { Certificate } from '@/types';

export const certificates: Certificate[] = [
  {
    id: 'cert-saylor-cpp',
    title: {
      en: 'CS107: C++ Programming',
      fr: 'CS107 : Programmation C++',
      ar: 'CS107: برمجة ++C'
    },
    issuer: {
      en: 'Saylor Academy',
      fr: 'Saylor Academy',
      ar: 'أكاديمية سايلور'
    },
    description: {
      en: 'Accredible-backed credential covering modern C++ syntax, STL containers, file I/O, exception safety, and object-oriented design.',
      fr: 'Certificat Accredible couvrant la syntaxe C++ moderne, les conteneurs STL, l’I/O fichier, la gestion des exceptions et la conception orientée objet.',
      ar: 'شهادة من Accredible تغطي أساسيات ++C الحديثة، حاويات STL، إدخال/إخراج الملفات، أمان الاستثناءات، وتصميم البرمجيات الكينوني.'
    },
    issueDate: '2022-02-06',
    credentialUrl: 'https://certificates.saylor.org/2af3284e-fd1b-4cce-b8ee-ab87607b730c',
    tags: ['C++', 'Accredible'],
    badge: 'Accredible'
  },
  {
    id: 'cert-bcdiploma',
    title: {
      en: 'BCdiploma Verifiable Credential',
      fr: 'Attestation vérifiable BCdiploma',
      ar: 'شهادة قابلة للتحقق من BCdiploma'
    },
    issuer: {
      en: 'BCdiploma',
      fr: 'BCdiploma',
      ar: 'BCdiploma'
    },
    description: {
      en: 'Blockchain-secured certificate issued via BCdiploma with tamper-proof QR verification for academic records.',
      fr: 'Certificat sécurisé sur blockchain via BCdiploma avec vérification instantanée par QR pour les relevés académiques.',
      ar: 'شهادة مؤمنة على البلوك تشين صادرة عن BCdiploma مع تحقق فوري عبر رمز QR للسجلات الأكاديمية.'
    },
    credentialUrl: 'https://certificate.bcdiploma.com/check/3AA00FBCF0A197B14B80C1FC309080EEA822351F3C2E079BA08F69EF3DDF1050d2ZZbDczMml3SzBuTGhzVU9KVUNzNld0aDk1ZjZmNE5rNnFrYlNtRXJzNkRCYkxU',
    tags: ['Blockchain', 'QR'],
    badge: 'BCdiploma'
  },
  {
    id: 'cert-hashgraph',
    title: {
      en: 'Hashgraph Developer Program',
      fr: 'Programme développeur Hashgraph',
      ar: 'برنامج مطور هاشجراف'
    },
    issuer: {
      en: 'Hedera / Hashgraph Dev',
      fr: 'Hedera / Hashgraph Dev',
      ar: 'Hedera / Hashgraph Dev'
    },
    description: {
      en: 'Hands-on credential covering Hedera Hashgraph architecture, consensus services, tokenization workflows, and smart-contract deployment.',
      fr: 'Attestation pratique sur Hedera Hashgraph couvrant l’architecture, les services de consensus, la tokenisation et le déploiement de smart contracts.',
      ar: 'شهادة تطبيقية حول Hedera Hashgraph تشمل المعمارية، خدمات الإجماع، سير عمل التوكنات، ونشر العقود الذكية.'
    },
    credentialUrl: 'https://certs.hashgraphdev.com/bfe61ba1-b77f-4ed8-9187-9754b75cfaf7.pdf',
    asset: '/blockchain-certification.pdf',
    tags: ['Hedera', 'Web3'],
    badge: 'Hashgraph Dev'
  }
];
