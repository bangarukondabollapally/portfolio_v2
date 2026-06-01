# docs/nextjs-architecture.md
# Next.js Architecture
# Bangaru Konda Portfolio

---

## Complete Folder Structure

```
bangaru-portfolio/
│
├── .antigravitycli/
│   └── config.json                  — Antigravity agent project config
│
├── public/
│   ├── images/
│   │   ├── projects/
│   │   │   └── prief-ai.png         — Project screenshot (WebP preferred)
│   │   └── og/
│   │       └── default.png          — OG card image (1200x630)
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                         — Next.js App Router root
│   │   ├── layout.tsx               — Root layout (HTML, body, providers)
│   │   ├── page.tsx                 — Homepage (section composition only)
│   │   ├── globals.css              — CSS tokens + base reset
│   │   └── not-found.tsx            — 404 page (minimal, inherits root layout)
│   │
│   ├── components/
│   │   │
│   │   ├── layout/                  — Structural/persistent UI
│   │   │   ├── Navbar.tsx           — Velocity-sensitive nav, active section tracking
│   │   │   ├── Footer.tsx           — Minimal footer, static Server Component
│   │   │   ├── CustomCursor.tsx     — Custom cursor, desktop only, client
│   │   │   └── SmoothScroll.tsx     — Lenis wrapper, client
│   │   │
│   │   ├── sections/                — Page sections, one file per section
│   │   │   ├── Hero.tsx             — Fullscreen hero, parallax, mask reveal
│   │   │   ├── About.tsx            — Editorial split, capabilities
│   │   │   ├── Projects.tsx         — Project list with direction-aware hover
│   │   │   ├── Skills.tsx           — Three marquee rows
│   │   │   └── Contact.tsx          — Fullscreen CTA, magnetic button
│   │   │
│   │   └── ui/                      — Atomic reusable components
│   │       ├── MagneticButton.tsx   — Spring-magnetic CTA button
│   │       ├── TextReveal.tsx       — Mask-reveal text wrapper
│   │       ├── ProjectCard.tsx      — Single project row with all hover logic
│   │       ├── MarqueeRow.tsx       — Single scrolling marquee strip
│   │       ├── SectionLabel.tsx     — `(Section Name)` label component
│   │       ├── ScrollIndicator.tsx  — Animated scroll cue
│   │       └── HorizontalRule.tsx   — Semantic animated divider
│   │
│   ├── hooks/                       — Custom React hooks (all client-side)
│   │   ├── useMagneticHover.ts      — Spring magnetic pull effect
│   │   ├── useDirectionalHover.ts   — Entry/exit direction detection
│   │   ├── useScrollVelocity.ts     — Scroll speed for nav hide/reveal
│   │   ├── useScrollProgress.ts     — Normalized scroll progress (0-1)
│   │   └── useInView.ts             — Intersection Observer convenience hook
│   │
│   ├── lib/
│   │   ├── animations/
│   │   │   ├── variants.ts          — All Framer Motion variant objects
│   │   │   ├── springs.ts           — Spring physics configs (locked values)
│   │   │   └── utils.ts             — staggerDelay(), maskRevealWrapper(), etc.
│   │   └── utils.ts                 — General utility: cn(), formatDate(), etc.
│   │
│   ├── data/                        — All content and copy (source of truth)
│   │   ├── projects.ts              — Project data array (typed)
│   │   ├── skills.ts                — Marquee row data (typed)
│   │   └── meta.ts                  — Nav items, socials, site metadata
│   │
│   ├── types/
│   │   └── index.ts                 — All shared TypeScript interfaces
│   │
│   └── styles/
│       └── tokens.css               — Extended design token overrides if needed
│
├── .env.local                       — Environment variables
├── next.config.ts                   — Next.js configuration
├── tailwind.config.ts               — Tailwind + design token extensions
├── tsconfig.json                    — TypeScript strict mode
├── package.json
└── README.md
```

---

## Folder Responsibilities

### `src/app/`
**Owns:** Routing, page-level metadata, root providers, global styles  
**Boundaries:** No business logic. No component definitions beyond layout shells. No animation definitions.

`layout.tsx` mounts exactly two persistent elements: `SmoothScroll` (Lenis provider) and `CustomCursor`. Nothing else is persistent. All section components are rendered in `page.tsx`, not `layout.tsx`.

`globals.css` is the single source of truth for design tokens as CSS custom properties. Tailwind extends these tokens but does not define them.

### `src/components/layout/`
**Owns:** Elements that persist across the page (navbar, footer) or wrap the entire layout (cursor, smooth scroll)  
**Boundaries:** Must not contain section-specific logic. Must not import from `sections/`.

`CustomCursor.tsx` is a pure visual overlay. It reads cursor position and adjusts its own appearance. It does NOT communicate state to other components.

`Navbar.tsx` tracks active section using IntersectionObserver on each section's root element. It manages its own hide/reveal state via `useScrollVelocity`.

### `src/components/sections/`
**Owns:** Individual page sections — layout, content composition, section-level animation orchestration  
**Boundaries:** Each section file is responsible for one section only. Sections import from `ui/`, `hooks/`, `lib/animations/`, and `data/`. Sections do NOT import from other sections.

Each section accepts no props (all data from `data/` files). Sections are composed in `app/page.tsx`.

### `src/components/ui/`
**Owns:** Atomic, reusable UI primitives  
**Boundaries:** Must be genuinely reusable. No section-specific logic. Must accept props for all variable content. Must have defined prop interfaces in `types/index.ts`.

`MagneticButton.tsx` accepts: `children`, `href`, `onClick`, `className`. It handles all magnetic behavior internally.

`TextReveal.tsx` accepts: `children`, `delay?`, `className`. It wraps children in a mask-reveal container.

`ProjectCard.tsx` accepts: `project: Project`. All display logic lives here.

### `src/hooks/`
**Owns:** Stateful browser interaction logic extracted for reuse  
**Boundaries:** Must return values, not JSX. Must have TypeScript return types. Must handle cleanup in `useEffect` return.

All hooks are client-side only (cannot be called from Server Components).

### `src/lib/animations/`
**Owns:** The animation system — spring configs and variant objects  
**Boundaries:** Pure TypeScript exports. No React imports. No JSX. No side effects.

`springs.ts` exports are LOCKED — do not modify spring values without design review. Adding new springs is acceptable.

`variants.ts` exports are APPEND-ONLY for existing variants — the existing variant objects must not change. New variants can be added.

`utils.ts` exports utility functions that compose animations: `staggerDelay(index, base)`, `createMaskWrapper()`.

### `src/data/`
**Owns:** All content, copy, and structured data  
**Boundaries:** Pure TypeScript data exports. No React. No styling. No logic beyond basic data transformation.

These files are the **only** place where text content lives. If copy needs to change, it changes here. Nothing else.

### `src/types/`
**Owns:** All shared TypeScript interfaces and types  
**Boundaries:** No logic, no values — only type definitions. Imported everywhere that data structures are used.

---

## Key Architectural Decisions

### Server vs Client Component Boundaries

```
Server Components (default):
  app/layout.tsx (except providers)
  app/page.tsx (section composition only)
  components/layout/Footer.tsx
  All data/ files

Client Components ('use client'):
  components/layout/Navbar.tsx        (scroll listeners)
  components/layout/CustomCursor.tsx  (mouse events)
  components/layout/SmoothScroll.tsx  (Lenis init)
  components/sections/Hero.tsx        (parallax, animations)
  components/sections/About.tsx       (scroll triggers)
  components/sections/Projects.tsx    (hover interactions)
  components/sections/Skills.tsx      (marquee)
  components/sections/Contact.tsx     (magnetic, form)
  All components/ui/*.tsx             (interactive)
  All hooks/*.ts                      (browser APIs)
```

**Rule of thumb:** If it uses `useState`, `useEffect`, browser events, or Framer Motion animation hooks → `'use client'`. If it only renders HTML from data → Server Component.

### Data Flow

```
src/data/*.ts
    ↓ (imported directly, no API calls needed for static content)
src/components/sections/*.tsx
    ↓ (props passed down)
src/components/ui/*.tsx
```

No global state management library needed. No context for content data. Keep it simple — the data is static.

### CSS Strategy

```
Design tokens:    CSS custom properties in globals.css
Layout:           Tailwind utility classes
Component states: Tailwind (hover:, focus-visible:, etc.)
Animations:       Framer Motion inline styles via motion values
Transitions:      Tailwind transition utilities for micro-interactions
```

Do not mix CSS Modules with Tailwind. Do not use styled-components. Do not use emotion.

---

## Configuration Files

### `tailwind.config.ts`

```typescript
// Extends theme with:
// colors: maps CSS var tokens to Tailwind class names
//   e.g. 'bg': 'var(--bg)', 'text-primary': 'var(--text-primary)'
// fontFamily: display (Geist), mono (Geist Mono)
// spacing: section (160px), gutter (80px)
// maxWidth: page (1400px)
// keyframes + animation: grain, marquee-left, marquee-right
```

### `next.config.ts`

```typescript
// Key settings:
// images: { formats: ['image/webp', 'image/avif'] }
// experimental: { optimizeCss: true }
// compiler: { removeConsole: { exclude: ['error'] } } (production only)
// headers: strict security headers
```

### `tsconfig.json`

```json
// Strict mode enabled
// Paths: "@/*" → "./src/*"
// Target: ES2022
// Module: ESNext
// moduleResolution: bundler
```
