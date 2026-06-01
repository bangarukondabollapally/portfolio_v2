# project-restructure.md
# Bangaru Konda — Portfolio Project Restructure Plan

---

## 1. Current State Analysis

### What Exists
```
assets/
  bangaru.jpeg          — single profile image, no optimization
index.html              — homepage, static HTML
work.html               — projects page, static HTML
contact.html            — contact page, static HTML
style.css               — monolithic CSS, no system
bent design.md          — design reference notes
SKILL.md                — skill documentation
```

### Current State Problems

**Architecture**
- Multi-page HTML with no shared component system
- Zero reusability — every section is hardcoded
- No routing system; navigation is raw `<a href>` links
- Zero state management capability
- Zero animation infrastructure
- CSS is written without tokens or system — magic numbers everywhere

**Design**
- No typography scale
- No spacing system
- No color tokens
- No responsive grid
- No motion language
- No interaction states beyond basic `:hover`

**Performance**
- No image optimization pipeline
- No code splitting
- Single unminified CSS file
- No font loading strategy
- No lazy loading

**Developer Experience**
- No component isolation
- Cannot build and test in isolation
- Changes to shared elements require manual edits across multiple HTML files
- No TypeScript — no type safety on data
- No linting or formatting

**Content**
- Content is embedded in HTML markup — difficult to update
- Project data scattered, no structured schema
- No consistent narrative or storytelling structure

---

## 2. Future State Architecture

### Technology Decisions

| Concern | Decision | Rationale |
|---|---|---|
| Framework | Next.js 14 App Router | RSC support, image optimization, font loading, deployment primitives |
| Language | TypeScript (strict) | Type-safe data, component props, animation configs |
| Styling | Tailwind CSS + CSS Variables | Utility-first for layout speed, CSS vars for design tokens and theming |
| Animation | Framer Motion | Best-in-class spring physics, scroll-linked values, layout animations |
| Smooth Scroll | Lenis | Buttery RAF-based smooth scrolling, Framer Motion compatible |
| Fonts | next/font (Google Fonts: Geist) | Zero-CLS, self-hosted, instant swap |
| Deployment | Vercel | Native Next.js deployment, edge functions, analytics |
| Package Manager | pnpm | Faster installs, strict dependency resolution |

### Future Folder Structure
```
bangaru-portfolio/
├── .antigravitycli/          — Antigravity agent config
├── public/
│   ├── images/
│   │   ├── projects/         — Optimized project screenshots (WebP)
│   │   └── og/               — Open Graph images
│   └── fonts/                — Self-hosted font fallbacks if needed
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        — Root layout: providers, cursor, smooth scroll
│   │   ├── page.tsx          — Homepage composition
│   │   ├── globals.css       — CSS tokens + base resets
│   │   └── not-found.tsx     — 404 page (inherits layout)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── SmoothScroll.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   └── ui/
│   │       ├── MagneticButton.tsx
│   │       ├── TextReveal.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── MarqueeRow.tsx
│   │       ├── SectionLabel.tsx
│   │       ├── ScrollIndicator.tsx
│   │       └── HorizontalRule.tsx
│   │
│   ├── hooks/
│   │   ├── useMagneticHover.ts
│   │   ├── useDirectionalHover.ts
│   │   ├── useScrollVelocity.ts
│   │   ├── useScrollProgress.ts
│   │   └── useInView.ts
│   │
│   ├── lib/
│   │   ├── animations/
│   │   │   ├── variants.ts   — All Framer Motion variant objects
│   │   │   ├── springs.ts    — Spring physics configs
│   │   │   └── utils.ts      — stagger helpers, mask helpers
│   │   └── utils.ts          — General utility functions
│   │
│   ├── data/
│   │   ├── projects.ts       — Typed project data
│   │   ├── skills.ts         — Skills / stack data
│   │   └── meta.ts           — Site metadata, social links, nav items
│   │
│   ├── types/
│   │   └── index.ts          — Shared TypeScript interfaces
│   │
│   └── styles/
│       └── tokens.css        — Design token overflows that can't live in globals
│
├── .env.local                — Environment variables (analytics, etc)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. Migration Path

### Phase 0 — Scaffold (Pre-implementation)
- Initialize Next.js 14 with App Router and TypeScript
- Install and configure: Tailwind, Framer Motion, Lenis
- Set up next/font with Geist
- Configure tsconfig paths (`@/` alias)
- Initialize .antigravitycli config
- Set up pnpm workspace

### Phase 1 — Design Foundation
- Define all CSS tokens in `globals.css`
- Set up Tailwind config extending tokens
- Configure typography scale
- Set up spacing system
- Document in `docs/design-system.md`

### Phase 2 — Layout Shell
- `app/layout.tsx` — Lenis provider + cursor mount point
- `Navbar.tsx` — static first, animate after
- `Footer.tsx` — static
- `CustomCursor.tsx` — client component, desktop only
- `SmoothScroll.tsx` — Lenis wrapper

### Phase 3 — Data Layer
- Define TypeScript interfaces in `types/index.ts`
- Populate `data/projects.ts` with Prief AI and future projects
- Populate `data/skills.ts` with three-row marquee data
- Populate `data/meta.ts` with nav, socials, metadata

### Phase 4 — Section Implementation (Content First)
- Build each section as static content first
- No animations at this stage
- Verify layout, typography, spacing
- Mobile-responsive first

### Phase 5 — Animation Layer
- Add Framer Motion variants to sections
- Add scroll-triggered animations
- Add page load sequence
- Add magnetic buttons
- Add custom cursor behavior

### Phase 6 — Polish
- Grain texture
- Direction-aware hover on project cards
- Parallax hero layers
- Scroll velocity nav behavior

### Phase 7 — Optimization
- Audit bundle size
- Verify animation performance (no layout triggers)
- Add `prefers-reduced-motion` handling
- Add `will-change` on animated elements
- Lighthouse audit and fix

---

## 4. Technical Decisions Deep-Dive

### Why Next.js App Router (not Pages Router)
- React Server Components reduce client JS for static sections
- `next/font` with App Router has zero layout shift
- `next/image` handles WebP conversion and lazy loading automatically
- Streaming and suspense enable progressive enhancement

### Why Tailwind + CSS Variables (not CSS Modules or styled-components)
- Tailwind utility classes for rapid layout construction
- CSS variables for design tokens that Framer Motion can read at runtime
- No runtime style injection (performance win)
- CSS variables cascade naturally for component variants

### Why Lenis (not native scroll)
- Native CSS `scroll-behavior: smooth` cannot be tuned
- Lenis gives precise easing control via RAF
- Compatible with Framer Motion's `useScroll`
- Enables scroll-velocity detection for navbar hide/reveal
- Can be disabled cleanly on mobile and reduced-motion

### Why Framer Motion (not GSAP)
- First-class React integration, no imperative DOM manipulation
- `useMotionValue` and `useTransform` are declarative and React-idiomatic
- Spring physics are the design spec — Framer's spring system matches exactly
- `LazyMotion` enables code-split animation features
- GSAP only for marquee if Framer's performance is insufficient (measure first)

---

## 5. Environment Setup

```bash
# Required node version
node >= 18.17.0

# Initialize project
pnpm create next-app@latest bangaru-portfolio \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Install animation dependencies
pnpm add framer-motion lenis

# Install font utilities
# (Geist is available via next/font/google)

# Dev tools
pnpm add -D @types/node prettier eslint-config-prettier
```

### next.config.ts
```typescript
// Key settings:
// - images.domains for any external project image sources
// - experimental.optimizeCss: true
// - compiler.removeConsole in production
```

### tailwind.config.ts
```typescript
// Key extensions:
// - colors mapping CSS variables → Tailwind classes
// - fontFamily: { display: ['var(--font-geist)'], mono: ['var(--font-geist-mono)'] }
// - spacing extending with section and gutter values
// - screens keeping default breakpoints (sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536)
```

---

## 6. Content Migration Map

| Current Location | New Location | Migration Action |
|---|---|---|
| `index.html` hero text | `data/meta.ts` | Extract to typed constant |
| `index.html` about text | `data/meta.ts` | Extract to typed constant |
| `work.html` project list | `data/projects.ts` | Structure as typed array |
| `assets/bangaru.jpeg` | `public/images/bangaru.jpg` | Optimize to WebP, keep JPEG fallback |
| `style.css` colors | `app/globals.css` CSS vars | Redesign using new palette |
| `style.css` typography | `app/globals.css` + Tailwind | Define scale as tokens |
| `contact.html` links | `data/meta.ts` socials | Extract to typed constant |
