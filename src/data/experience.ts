import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeuse Full-Stack',
      ar: 'متدربة مطور Full-Stack'
    },
    company: {
      en: 'ITServ',
      fr: 'ITServ',
      ar: 'ITServ'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie',
      ar: 'تونس'
    },
    startDate: '2025-02',
    endDate: 'present',
    logo: '/images/logos/itserv.png',
    description: {
      en: 'Graduation internship at ITServ leading the CRISP-DM cycle for an AI symptom analyst. Researched medical corpora, cleaned bespoke datasets, benchmarked multiple models, and fine-tuned T5-base with RAG-ready embeddings hosted behind Flask microservices. Built the React front-end with auth/registration, community forum with likes and nested replies, editorial blog, admin dashboards, and a RAG knowledge console for curating new articles.',
      fr: 'Projet de fin d’études chez ITServ en pilotant la méthodologie CRISP-DM pour un analyseur de symptômes basé sur l’IA. Recherche de corpus médicaux, nettoyage de jeux de données dédiés, comparaison de plusieurs modèles puis fine-tuning de T5-base avec embeddings compatibles RAG exposés via des microservices Flask. Réalisation du front-end React avec authentification/inscription, forum communautaire avec likes et réponses imbriquées, blog éditorial, tableaux de bord admin et console RAG pour enrichir les articles.',
      ar: 'تدريب التخرج لدى ITServ مع قيادة دورة CRISP-DM لبناء مساعد ذكاء اصطناعي لتحليل الأعراض. قمت بالبحث عن مجموعات بيانات طبية، وتنظيف البيانات المخصصة، ومقارنة عدة نماذج ثم ضبط نموذج T5-base مع تمثيلات متوافقة مع RAG يتم تقديمها عبر خدمات Flask المصغرة. أنجزت الواجهة الأمامية بـ React مع الدخول والتسجيل، منتدى مجتمعي بالإعجابات والردود المتداخلة، مدونة تحريرية، لوحات تحكم إدارية، ووحدة RAG لإضافة المقالات وتحسين الإجابات.'
    },
    type: 'work'
  },
  {
    id: 'exp-2',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeuse Full-Stack',
      ar: 'متدربة مطور Full-Stack'
    },
    company: {
      en: 'IronByte',
      fr: 'IronByte',
      ar: 'IronByte'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie',
      ar: 'تونس'
    },
    startDate: '2024-06',
    endDate: '2024-08',
    logo: '/images/logos/ironbyte.jpg',
    logoClassName: 'h-12 w-36 sm:w-44',
    description: {
      en: 'Built the internal communication platform at Ooredoo using Spring Boot + Angular. Applied DAO/DTO layering, PrimeNG components, and secure REST patterns to ship real-time chat with advanced filtering/search plus admin tooling. Strengthened QA with unit/integration tests while collaborating with product squads.',
      fr: 'Réalisé la plateforme de communication interne chez Ooredoo avec Spring Boot et Angular. Mise en œuvre des couches DAO/DTO, des composants PrimeNG et de patterns REST sécurisés pour livrer un chat temps réel avec filtrage/recherche avancés et outils admin. Renforcé la QA via tests unitaires et d’intégration en équipe produit.',
      ar: 'أنجزت منصة الاتصالات الداخلية لدى Ooredoo باستخدام Spring Boot و Angular. طبقت طبقات DAO/DTO ومكونات PrimeNG وأنماط REST آمنة لتقديم دردشة فورية مع تصفية وبحث متقدم وأدوات إدارية. دعمت الجودة باختبارات وحدة وتكامل بالتعاون مع فرق المنتج.'
    },
    type: 'work'
  },
  {
    id: 'exp-3',
    title: {
      en: 'Full-Stack Developer Intern',
      fr: 'Stagiaire Développeuse Full-Stack',
      ar: 'متدربة مطور Full-Stack'
    },
    company: {
      en: 'Ooredoo Tunisie',
      fr: 'Ooredoo Tunisie',
      ar: 'أوريدو تونس'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie',
      ar: 'تونس'
    },
    startDate: '2023-07',
    endDate: '2023-09',
    logo: '/images/logos/ooredoo.png',
    description: {
      en: 'Built internal communication application with real-time chat, advanced filtering, and search capabilities. Delivered comprehensive UX/UI design and implemented unit and integration testing. Technologies: Spring Boot, Angular.',
      fr: 'Développé une application de communication interne avec chat en temps réel, filtrage avancé et recherche. Livraison de conception UX/UI complète et mise en œuvre de tests unitaires et d\'intégration. Technologies: Spring Boot, Angular.',
      ar: 'بنيت تطبيق اتصالات داخلية مع دردشة في الوقت الفعلي وتصفية متقدمة وقدرات بحث. سلمت تصميم UX/UI شامل ونفذت اختبارات وحدة وتكامل. التقنيات: Spring Boot و Angular.'
    },
    type: 'work'
  },
  {
    id: 'exp-4',
    title: {
      en: 'Software Engineer Intern',
      fr: 'Stagiaire Ingénieure Logiciel',
      ar: 'متدربة مهندسة برمجيات'
    },
    company: {
      en: 'ITServ',
      fr: 'ITServ',
      ar: 'ITServ'
    },
    location: {
      en: 'Tunisia',
      fr: 'Tunisie',
      ar: 'تونس'
    },
    startDate: '2021-06',
    endDate: '2021-08',
    logo: '/images/logos/itserv.png',
    description: {
      en: 'Automated Excel-to-XML conversion for ITServ financial teams by shipping a Java desktop tool with Apache POI parsing, schema validation, and one-click exports that matched the client’s ERP ingestion rules.',
      fr: 'Automatisation de la conversion Excel vers XML pour les équipes financières d’ITServ via un outil Java (Apache POI) intégrant validation de schéma et export en un clic conforme aux règles d’ingestion ERP.',
      ar: 'أتمت تحويل ملفات Excel إلى XML لفرق المالية في ITServ عبر أداة سطح مكتب Java تعتمد على Apache POI، مع التحقق من المخططات وتصدير بنقرة واحدة متوافق مع قواعد استيراد الـ ERP.'
    },
    type: 'work'
  },
  {
    id: 'edu-1',
    title: {
      en: 'Bachelor of Engineering',
      fr: 'Licence en Ingénierie',
      ar: 'بكالوريوس الهندسة'
    },
    company: {
      en: 'ESPRIT — Private Higher School of Engineering and Technology',
      fr: 'ESPRIT — École Supérieure Privée d\'Ingénierie et de Technologie',
      ar: 'ESPRIT — المدرسة العليا الخاصة للهندسة والتكنولوجيا'
    },
    location: {
      en: 'Tunis, Tunisia',
      fr: 'Tunis, Tunisie',
      ar: 'تونس، تونس'
    },
    startDate: '2020-09',
    endDate: '2025-06',
    description: {
      en: 'Specialization in Web and Internet Technology. Completed multiple team projects including collaborative document platform, construction management system, and educational applications. Expected graduation: June 2025.',
      fr: 'Spécialisation en Technologie Web et Internet. Réalisation de plusieurs projets d\'équipe incluant plateforme de documents collaboratifs, système de gestion de construction et applications éducatives. Diplôme prévu: Juin 2025.',
      ar: 'تخصص في تكنولوجيا الويب والإنترنت. أكملت مشاريع فريق متعددة بما في ذلك منصة مستندات تعاونية ونظام إدارة البناء والتطبيقات التعليمية. التخرج المتوقع: يونيو 2025.'
    },
    type: 'education'
  }
];
