# russle

Web design, development, and branding studio. Personal portfolio site.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (CSS-first via `@theme`)
- Framer Motion
- Resend (transactional email)
- Cal.com (booking embed)
- Google Analytics 4

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in keys
npm run dev
```

Open <http://localhost:3000>.

## Project structure

- `src/app/` — App Router pages, API routes, layout, metadata
- `src/components/layout/` — Navbar, Footer, Container, Section
- `src/components/ui/` — Button, Card, Tag, Marquee, FAQ, Input, Textarea
- `src/components/animations/` — Reveal, motion wrappers
- `src/components/sections/` — Page sections (Hero, FeatureGrid, etc.)
- `src/content/work/` — Case study MDX files
- `src/lib/` — Resend, analytics, MDX, rate limiting helpers
- `public/fonts/` — Satoshi variable woff2 (self-hosted from Fontshare)

## Design system

Brand direction lives in [../russle-site/research/brand-direction.md](./research/brand-direction.md).
Design DNA in [./research/design-dna.md](./research/design-dna.md).
Full spec in [./research/design-spec.json](./research/design-spec.json).

## Routes

| Path                | What it is                                          |
|---------------------|-----------------------------------------------------|
| `/`                 | Home                                                |
| `/work`             | Case study index                                    |
| `/work/[slug]`      | Case study detail (MDX-driven)                      |
| `/about`            | About / founder story                               |
| `/contact`          | Contact form + Cal.com discovery call embed         |
| `/start`            | 8-step project intake questionnaire                 |
| `/api/contact`      | Resend handler for the contact form                 |
| `/api/intake`       | Resend handler for the project intake               |
| `/api/og`           | Dynamic Open Graph image                            |
