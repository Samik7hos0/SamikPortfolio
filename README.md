# Samik Sengupta — Data Engineer Portfolio

A single-page portfolio built with React, TypeScript, Vite and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Deploy

The `/dist` folder is fully static. Deploy it to Vercel, Netlify, or GitHub Pages.
On Vercel: import the repo, framework preset = Vite, done.

## Fonts

- **PP Neue Montreal** (body) loads from the Webflow CDN automatically.
- **PP Mondwest** (the pixel-serif accent font) is commercial. To enable it,
  drop `PPMondwest-Regular.woff2` into the `/public` folder. Until then it
  falls back gracefully to Georgia/serif — the site looks complete either way.

## Things to update before you ship

Search the codebase for these and swap in your real values:

- `your@email.com`            → your real email (App / PartnerSection / Layout)
- `linkedin.com/in/samiksengupta` → your real LinkedIn URL
- GitHub repo URLs are already set to github.com/Samik7hos0/*
- Replace the dark architecture panels in ProjectsSection with real
  screenshots of your dashboards/pipelines when you have them.

## Structure

```
src/
  App.tsx                      Hero + tech marquee + section composition
  index.css                    Font faces, marquee + fade animations, button shadows
  hooks/useInViewAnimation.ts  IntersectionObserver scroll-trigger hook
  components/
    Button.tsx                 primary / secondary / tertiary variants
    StatementSection.tsx       Personal statement + parallax panel
    LookingForSection.tsx      "What I'm looking for" (role types)
    BuildNotesCarousel.tsx     Auto-scrolling build notes
    ProjectsSection.tsx        Three real projects with architecture visuals
    PartnerSection.tsx         Contact CTA with cursor-trail effect
    Layout.tsx                 Footer, copyright bar, bottom nav
```
