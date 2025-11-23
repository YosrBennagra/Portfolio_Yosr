# Resume Placeholder

Add your resume PDF here as `resume.pdf`

## Quick Tips

1. **File Name:** Must be named `resume.pdf` (lowercase)
2. **Format:** PDF only
3. **Size:** Keep under 5MB for fast loading
4. **Content:** Make sure it matches your portfolio content

## How to Add

Simply place your resume PDF in this folder:
```
/public/resume/resume.pdf
```

## Update Download Link

The download button is already configured in:
- `src/components/sections/About.tsx`

The button will automatically link to `/resume/resume.pdf`

## Alternative: Link to External Resume

If you prefer to host your resume elsewhere (Google Drive, Dropbox, etc.):

1. Edit `src/components/sections/About.tsx`
2. Find the download button
3. Update the `href` to your external URL

Example:
```tsx
<a href="https://your-resume-link.com/resume.pdf" ...>
```
