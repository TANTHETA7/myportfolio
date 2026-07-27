# Tanmay — Portfolio

A world-class portfolio website built with Next.js 15, React 19, Three.js, Framer Motion, and GSAP.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | TailwindCSS |
| Animation | Framer Motion + GSAP |
| Smooth Scroll | Lenis |
| 3D | React Three Fiber + Three.js |
| UI Components | shadcn/ui + Radix UI |
| Email | EmailJS |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tanmay-portfolio.git
cd tanmay-portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables in .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

See `.env.example` for all required environment variables.

## Project Structure

```
tanmay-portfolio/
├── app/               # Next.js App Router pages + API routes
├── components/        # All React components
│   ├── animations/    # Animation wrapper components
│   ├── common/        # Shared/reusable components
│   ├── layout/        # Header, Footer, Navigation
│   ├── sections/      # Page sections (Hero, About, Skills…)
│   ├── three/         # Three.js / R3F scene components
│   └── ui/            # shadcn/ui primitives
├── config/            # Site-level configuration
├── constants/         # Static constants (navigation, etc.)
├── context/           # React Context providers
├── data/              # All content data files (projects, skills…)
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries (fonts, metadata…)
├── providers/         # Top-level providers (Lenis, Theme…)
├── public/            # Static assets (images, fonts, resume)
├── styles/            # Global styles + animation CSS
├── types/             # TypeScript type definitions
└── utils/             # Pure utility functions
```

## Updating Content

All content is data-driven. To update any section:

- **Projects** → `data/projects.ts`
- **Skills** → `data/skills.ts`
- **Experience** → `data/experience.ts`
- **Research** → `data/research.ts`
- **Social Links** → `data/social.ts`
- **Certificates** → `data/certificates.ts`
- **Timeline** → `data/timeline.ts`
- **Site Config** → `config/site.ts`

## Deployment

This project is optimized for Vercel. Push to `main` and Vercel will auto-deploy.

```bash
npm run build   # production build
npm run start   # serve production build locally
```

## Performance

- Lighthouse score: 95+
- Core Web Vitals: All green
- Bundle size: Optimized with code splitting + dynamic imports

## License

MIT © Tanmay
