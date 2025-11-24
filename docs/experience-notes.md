# Experience Notes

## ITServ – Graduation Internship (AI Clinic Assistant)

**Mission overview**
- Built an AI symptom assistant for ITServ from research to deployment.
- Paired business goals with CRISP-DM across every phase.

**Data & modeling**
- Collected and cleaned medical corpora, aligned structured plus unstructured inputs.
- Tested many models, then fine-tuned T5-base with TensorFlow, scikit-learn, TRL, and Hugging Face Transformers.
- Generated RAG embeddings and kept a fallback checkpoint on Hugging Face Hub.

**Platform engineering**
- Wrote Flask APIs served with Gunicorn.
- Mixed MongoDB (vector store + RAG articles) and PostgreSQL (forum, auth, doctor ratings, nested replies) with automatic failover to Mongo Atlas.
- Built admin tools to refresh embeddings, review articles, and control the knowledge base.

**Frontend & UX**
- React app covering authentication, patient forum, nested replies, doctor dashboards, article ratings, and admin console.

**DevOps & reliability**
- Jenkins pipeline for build/test/deploy with SonarQube quality gates and unit tests across React + Flask services.
- Grafana and Prometheus dashboards to watch API health and database load.
- Hugging Face-hosted model used as backup inference when the local service is down.
- Backend served via Gunicorn, frontend behind Nginx.

> Keep adding experiences here so both the detailed view and quick view stay accurate.

## IronByte – Full-Stack Intern (Education SaaS)

**Mission overview**
- Built a secure SaaS platform for students, teachers, and school admins.
- Delivered role-based access, timetables, and lesson sharing.

**Platform engineering**
- Modeled DAO/DTO layers with Spring Boot APIs and PrimeNG UI components.
- Automated class creation, timetable generation, and resource sharing workflows.
- Hardened APIs with auth/roles, plus unit + integration tests for each release.

**Collaboration & delivery**
- Worked with education stakeholders to capture needs and plan iterations.
- Documented usage guides so schools could onboard quickly.

## Ooredoo Tunisie – Full-Stack Intern (Communication App)

**Mission overview**
- Built the internal communication platform with Spring Boot + Angular.
- Focused on live messaging, filters, search, and admin tooling.

**Key work**
- Designed DAO/DTO architecture with secure REST endpoints and PrimeNG UI blocks.
- Delivered real-time chat, advanced filtering, and moderation features.
- Wrote unit and integration tests to keep every release stable.

## ITServ – Software Engineer Intern (Excel to XML Tool)

**Mission overview**
- Automated Excel-to-XML handoffs for finance teams.

**Key work**
- Built a Java desktop utility with Apache POI for large spreadsheet parsing.
- Added schema validation and one-click XML exports aligned with ERP import rules.
