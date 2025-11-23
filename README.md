# Portfolio

A modern, multilingual portfolio built with Next.js 14, featuring dark/light themes, smooth animations, and internationalization support for English and French.

## Features

- ✨ Modern, responsive design
- 🌍 Multi-language support (English & French)
- 🌓 Dark/Light mode with smooth transitions
- 🎭 Beautiful animations with Framer Motion
- 📱 Mobile-first, fully responsive
- 🚀 Built with Next.js 14 (App Router)
- 💅 Styled with Tailwind CSS
- 📝 Contact form with email integration
- 📄 Downloadable resume
- 🎨 Interactive project filtering
- 📊 Skills showcase with progress indicators
- 🧩 ReactBits-inspired micro-interactions (logo loop, target cursor, tilted cards, light rays)

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **Themes:** next-themes
- **i18n:** next-intl

## ReactBits-inspired Micro-interactions

Custom effects that mirror popular [ReactBits](https://reactbits.dev) components live under `src/components/ui/reactbits/` and are wired into the Hero, Skills, Experience, Projects, About, and Contact sections.

- `LogoLoop` animates the “tools I work with” marquee in the Skills section.
- `TargetCursor`, `LightRays`, and `Dock` power the Hero's ambient background + pointer-following CTA tray.
- `ScrollStack` summarizes recent roles inside Experience.
- `TiltedCard` + `ChromaGrid` turn project cards into depthy, chromatic panels.
- `SpotlightCard` highlights degree equivalence content, while `Lanyard` conveys current availability in Contact.

Feel free to reuse these building blocks wherever you need extra motion—each component stays framework-agnostic and only expects plain props or callbacks.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies
```bash
npm install
```

2. Create environment file
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your values

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Personal Information

Update the following files with your information:

- **Data Files:** `src/data/`
  - `projects.ts` - Your projects
  - `skills.ts` - Your skills
  - `experience.ts` - Your work experience and education
  - `social.ts` - Your social media links

- **Images & Logos:**
  - Add your profile photo(s) under `/public/images/`
  - Keep curated project screenshots inside `/public/images/projects/`
  - Store company logos in `/public/images/logos/` (e.g., `/public/images/logos/itserv.png`) so experience cards can display branded badges
  - Place reusable SVGs inside `/public/icons/` to avoid cluttering the root directory
- **Reports & Demos:**
  - Store long-form documents (e.g., PFE report) directly in `/public` and link to them via `/your-file.pdf`
  - For inline previews you can either load the public asset directly (current implementation) or proxy it through a lightweight API route (see `src/app/api/report/route.ts`) if you need extra headers/analytics; keep a separate download link for direct file access
  - Place demo videos under `/public/media/` (e.g., `/public/media/demo-app.mov`, `/public/media/demo-devops.mp4`) to keep assets organized
  - Keep raw design walkthroughs or large screenshot dumps in dedicated folders (e.g., `/public/Symply/`) and copy curated highlights into `/public/images/projects/` for faster page loads
  - Keep your resume document inside `/public/resume/` (e.g., `/public/resume/resume.pdf`) so download buttons stay consistent

- **Metadata:**
  - Update `src/app/[locale]/layout.tsx` with your SEO information

### Email Configuration

1. Sign up for [Resend](https://resend.com)
2. Verify your domain
3. Get your API key
4. Add to `.env.local`:
```env
RESEND_API_KEY=your_api_key
CONTACT_EMAIL=your-email@example.com
```

## Project Structure

```
portfolio/
├── public/
│   ├── icons/           # Standalone SVG icon set
│   ├── images/
│   │   ├── logos/       # Company/client logos (e.g., itserv.png)
│   │   └── projects/    # Project screenshots
│   ├── media/           # Demo videos and motion assets
│   ├── resume/          # Resume PDF(s)
│   └── pfe-report.pdf   # Example long-form document served inline
├── src/
│   ├── app/
│   │   ├── [locale]/    # Localized routes
│   │   └── api/         # API routes
│   ├── components/
│   │   ├── layout/      # Layout components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Content data
│   ├── lib/             # Utilities and helpers
│   ├── messages/        # Translation files
│   └── types/           # TypeScript types
└── .portfolio.instructions.md  # Detailed documentation
```

## Customization

### Colors

Update colors in `src/app/globals.css` (CSS variables)

### Fonts

Update fonts in `src/app/[locale]/layout.tsx`

### Translations

Edit translation files in `src/messages/`:
- `en.json` - English
- `fr.json` - French

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

**Vercel Notes**

- Static assets served from `public/` must stay under Vercel's 100 MB file-size limit—keep demo videos compressed and prefer `.mp4`/`.mov` optimized exports.
- Run `npm run lint` locally before pushing; current warnings/errors (e.g., `no-explicit-any`, `react/no-unescaped-entities`, `react-hooks/set-state-in-effect`) will surface during CI and should be resolved ahead of deployment.
- If you add more large media files, consider hosting them on an external storage/CDN and linking to the streaming URL to keep the deployment bundle light.

### Build for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this template for your own portfolio!

## Support

For detailed documentation, see `.portfolio.instructions.md`

---

Built with ❤️ using Next.js

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
