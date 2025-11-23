# Portfolio

A modern, multilingual portfolio built with Next.js 14, featuring dark/light themes, smooth animations, and internationalization support for English, French, and Arabic.

## Features

- ✨ Modern, responsive design
- 🌍 Multi-language support (English, French, Arabic)
- 🌓 Dark/Light mode with smooth transitions
- 🎭 Beautiful animations with Framer Motion
- 📱 Mobile-first, fully responsive
- 🚀 Built with Next.js 14 (App Router)
- 💅 Styled with Tailwind CSS
- 📝 Contact form with email integration
- 📄 Downloadable resume
- 🎨 Interactive project filtering
- 📊 Skills showcase with progress indicators

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

- **Images:**
  - Add your profile photo to `/public/images/profile.jpg`
  - Add project screenshots to `/public/images/projects/`
  - Add your resume PDF to `/public/resume/resume.pdf`

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
│   ├── images/          # Images and assets
│   └── resume/          # Resume PDF
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
- `ar.json` - Arabic

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

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
