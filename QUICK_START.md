# Quick Customization Guide

This guide shows you exactly where to make common changes to personalize your portfolio.

## 1. Change Your Name

**File:** `src/components/sections/Hero.tsx`

Find line 55 and replace:
```tsx
<motion.h1 className="...">
  Your Name  {/* ← Change this */}
</motion.h1>
```

## 2. Update Your Job Title

**File:** `src/messages/en.json` (and fr.json)

Find:
```json
{
  "hero": {
    "title": "Full Stack Developer"  ← Change this
  }
}
```

## 3. Add Your Projects

**File:** `src/data/projects.ts`

Add a new project:
```typescript
{
  id: 'unique-id',
  title: {
    en: 'Project Name',
    fr: 'Nom du Projet'
  },
  description: {
    en: 'Description...',
    fr: 'Description...'
  },
  image: '/images/projects/myproject.jpg',
  tags: ['React', 'Node.js', 'MongoDB'],
  category: 'fullstack', // or 'web' or 'mobile'
  links: {
    demo: 'https://myproject.com',
    github: 'https://github.com/user/repo'
  },
  featured: true
}
```

## 4. Update Social Links

**File:** `src/data/social.ts`

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/YOUR-USERNAME',  ← Change
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/YOUR-USERNAME',  ← Change
    icon: 'linkedin'
  },
  // ... more links
];
```

## 5. Add Your Skills

**File:** `src/data/skills.ts`

```typescript
export const skills: Skill[] = [
  { 
    name: 'React',           ← Skill name
    category: 'frontend',    ← frontend, backend, or tools
    level: 95                ← 0-100
  },
  // Add more skills...
];
```

## 6. Update Work Experience

**File:** `src/data/experience.ts`

```typescript
{
  id: 'exp-1',
  title: {
    en: 'Your Job Title',
    fr: 'Votre Titre',
    ar: 'المسمى الوظيفي'
  },
  company: {
    en: 'Company Name',
    fr: 'Nom de l\'entreprise',
    ar: 'اسم الشركة'
  },
  location: {
    en: 'City, Country',
    fr: 'Ville, Pays',
    ar: 'المدينة، البلد'
  },
  startDate: '2022-01',        ← YYYY-MM format
  endDate: 'present',          ← or YYYY-MM
  description: {
    en: 'What you did...',
    fr: 'Ce que vous avez fait...',
    ar: 'ما فعلته...'
  },
  type: 'work'  ← 'work' or 'education'
}
```

## 7. Change Primary Color

**File:** `src/app/globals.css`

Find and change:
```css
:root {
  --primary: 37 99 235;  ← Change these RGB values
  /* Example colors:
     Blue: 37 99 235
     Purple: 147 51 234
     Green: 34 197 94
     Red: 239 68 68
  */
}
```

## 8. Update Contact Email

**Files to update:**

1. `src/data/social.ts`:
```typescript
{
  name: 'Email',
  url: 'mailto:your.email@example.com',  ← Change
  icon: 'mail'
}
```

2. `src/components/sections/Contact.tsx`:
Find line with email display and update

3. `.env.local`:
```env
CONTACT_EMAIL=your-email@example.com  ← Change
```

## 9. Add Profile Photo

1. Place your photo at: `/public/images/profile.jpg`
2. Edit `src/components/sections/About.tsx`
3. Find the commented Image component (around line 60)
4. Uncomment these lines:
```tsx
<Image
  src="/images/profile.jpg"
  alt="Profile"
  fill
  className="object-cover rounded-2xl"
/>
```

## 10. Add Project Images

1. Add images to: `/public/images/projects/`
2. Update `src/data/projects.ts` with correct image paths
3. Edit `src/components/sections/Projects.tsx`
4. Uncomment the Image component (around line 110):
```tsx
<Image
  src={project.image}
  alt={project.title[locale]}
  fill
  className="object-cover"
/>
```

## 11. Setup Resume Download

**Option A: PDF File**
1. Add resume to: `/public/resume/resume.pdf`
2. The button in About section will work automatically

**Option B: External Link**

Edit `src/components/sections/About.tsx`:
```tsx
<Button 
  size="lg" 
  className="gap-2"
  onClick={() => window.open('https://your-resume-url.com', '_blank')}
>
  <Download className="w-5 h-5" />
  {t('downloadResume')}
</Button>
```

## 12. Change Website Title & Description

**File:** `src/app/[locale]/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Your Name | Job Title',  ← Change
  description: 'Your portfolio description',  ← Change
  keywords: ['your', 'keywords'],  ← Change
  authors: [{ name: 'Your Name' }],  ← Change
};
```

## 13. Customize About Section Text

**File:** `src/components/sections/About.tsx`

Find the paragraphs (around line 70) and update:
```tsx
<p className="...">
  Your bio here...  ← Change this
</p>
<p className="...">
  More about you...  ← And this
</p>
```

## 14. Add More Navigation Items

1. Edit `src/components/layout/Header.tsx`:
```typescript
const navItems = ['home', 'about', 'skills', 'projects', 'experience', 'contact', 'blog'];  ← Add items
```

2. Add translations in `src/messages/*.json`:
```json
{
  "nav": {
    "blog": "Blog"  ← Add translation
  }
}
```

3. Create section with matching id in page

## 15. Customize Footer

**File:** `src/components/layout/Footer.tsx`

Update the brand name, links, and text as needed.

## Common File Locations

```
Content Data:
├── src/data/projects.ts      ← Your projects
├── src/data/skills.ts        ← Your skills
├── src/data/experience.ts    ← Work history
└── src/data/social.ts        ← Social links

Translations:
├── src/messages/en.json      ← English text
├── src/messages/fr.json      ← French text

Main Sections:
├── src/components/sections/Hero.tsx        ← Hero section
├── src/components/sections/About.tsx       ← About section
├── src/components/sections/Skills.tsx      ← Skills section
├── src/components/sections/Projects.tsx    ← Projects section
├── src/components/sections/Experience.tsx  ← Experience section
└── src/components/sections/Contact.tsx     ← Contact section

Styling:
├── src/app/globals.css       ← Colors, fonts, global styles
└── tailwind.config.ts        ← Tailwind configuration

Configuration:
├── .env.local                ← Environment variables
├── next.config.ts            ← Next.js config
└── src/i18n.ts              ← i18n config
```

## Quick Tips

1. **After making changes:** Save and check http://localhost:3000
2. **Build errors?** Run `npm run build` to see what's wrong
3. **Translations missing?** Make sure all 3 language files have the same keys
4. **Images not showing?** Check the file path is correct and file exists
5. **Want to add a section?** Copy an existing section and modify it

---

Need more help? Check:
- `SETUP_COMPLETE.md` - Overview and next steps
- `.portfolio.instructions.md` - Detailed documentation
- `CHECKLIST.md` - Complete customization checklist
