# Portfolio Customization Checklist

Use this checklist to track your portfolio customization progress.

## 📝 Content Updates

### Data Files (src/data/)

- [ ] **projects.ts** - Add your real projects
  - [ ] Update project titles (EN, FR, AR)
  - [ ] Update descriptions (EN, FR, AR)
  - [ ] Add project tags/technologies
  - [ ] Add demo and GitHub links
  - [ ] Set correct categories

- [ ] **skills.ts** - Add your skills
  - [ ] List frontend skills with levels
  - [ ] List backend skills with levels
  - [ ] List tools/other skills with levels
  - [ ] Adjust skill levels accurately

- [ ] **experience.ts** - Add work history
  - [ ] Add work experiences (EN, FR, AR)
  - [ ] Add education (EN, FR, AR)
  - [ ] Update dates
  - [ ] Write descriptions

- [ ] **social.ts** - Update social links
  - [ ] GitHub URL
  - [ ] LinkedIn URL
  - [ ] Twitter/X URL
  - [ ] Email address

## 🖼️ Images & Assets

- [ ] **Profile Photo**
  - [ ] Add to `/public/images/profile.jpg`
  - [ ] Recommended: 500x500px, square
  - [ ] Uncomment Image component in About.tsx

- [ ] **Project Screenshots**
  - [ ] Add images to `/public/images/projects/`
  - [ ] Update image paths in projects.ts
  - [ ] Recommended: 1200x800px
  - [ ] Uncomment Image components in Projects.tsx

- [ ] **Resume PDF**
  - [ ] Add to `/public/resume/resume.pdf`
  - [ ] Keep under 5MB
  - [ ] Update download link if needed

- [ ] **Favicon**
  - [ ] Replace `/public/favicon.ico`
  - [ ] Consider adding app icons for mobile

## ✏️ Text Content

- [ ] **Hero Section** (src/components/sections/Hero.tsx)
  - [ ] Replace "Your Name" with actual name
  - [ ] Verify title/role is correct
  - [ ] Check description matches your brand

- [ ] **About Section** (src/components/sections/About.tsx)
  - [ ] Expand bio paragraphs
  - [ ] Add personal touch
  - [ ] Mention achievements

- [ ] **Metadata** (src/app/[locale]/layout.tsx)
  - [ ] Update page title
  - [ ] Update description
  - [ ] Add your name as author
  - [ ] Update OpenGraph info

## 🔧 Configuration

- [ ] **Environment Variables** (.env.local)
  - [ ] Set NEXT_PUBLIC_SITE_URL
  - [ ] Add RESEND_API_KEY (if using email)
  - [ ] Add CONTACT_EMAIL

- [ ] **Email Setup**
  - [ ] Sign up for Resend
  - [ ] Verify domain
  - [ ] Add API key to .env.local
  - [ ] Uncomment email code in api/contact/route.ts
  - [ ] Test contact form

- [ ] **Translations** (src/messages/)
  - [ ] Review en.json translations
  - [ ] Review fr.json translations
  - [ ] Review ar.json translations
  - [ ] Add any custom text

## 🎨 Styling (Optional)

- [ ] **Colors** (src/app/globals.css)
  - [ ] Customize primary color
  - [ ] Customize accent color
  - [ ] Adjust dark mode colors

- [ ] **Fonts** (src/app/[locale]/layout.tsx)
  - [ ] Keep default or change fonts
  - [ ] Update font weights if needed

## 🧪 Testing

- [ ] **Functionality**
  - [ ] Test theme switching
  - [ ] Test language switching
  - [ ] Test navigation (smooth scroll)
  - [ ] Test project filtering
  - [ ] Test skill filtering
  - [ ] Test contact form submission

- [ ] **Responsive Design**
  - [ ] Test on mobile (375px)
  - [ ] Test on tablet (768px)
  - [ ] Test on desktop (1440px)
  - [ ] Test mobile menu

- [ ] **Browsers**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Accessibility**
  - [ ] Check keyboard navigation
  - [ ] Test with screen reader
  - [ ] Verify color contrast
  - [ ] Check ARIA labels

## 🚀 Deployment

- [ ] **Pre-deployment**
  - [ ] Run `npm run build` successfully
  - [ ] Fix any build errors
  - [ ] Test production build locally
  - [ ] Optimize images

- [ ] **Git Setup**
  - [ ] Initialize git repository
  - [ ] Create .gitignore (already included)
  - [ ] Make initial commit
  - [ ] Push to GitHub

- [ ] **Vercel Deployment**
  - [ ] Create Vercel account
  - [ ] Import GitHub repository
  - [ ] Add environment variables
  - [ ] Deploy
  - [ ] Test live site
  - [ ] Set up custom domain (optional)

## 📊 SEO & Analytics (Optional)

- [ ] **SEO**
  - [ ] Add meta descriptions
  - [ ] Add OpenGraph images
  - [ ] Create sitemap.xml
  - [ ] Add robots.txt
  - [ ] Submit to Google Search Console

- [ ] **Analytics**
  - [ ] Set up Google Analytics
  - [ ] Or use Vercel Analytics
  - [ ] Or use Plausible

## 🎯 Final Checks

- [ ] All sections have real content (no placeholders)
- [ ] All links work correctly
- [ ] Images load properly
- [ ] No console errors
- [ ] Site performs well (Core Web Vitals)
- [ ] Mobile experience is smooth
- [ ] Animations work on all devices
- [ ] Email notifications work
- [ ] Resume downloads correctly

---

## Progress Tracking

**Started:** _______________
**Completed:** _______________
**Deployed:** _______________

**Live URL:** _______________

---

Save this file and check items off as you complete them!
