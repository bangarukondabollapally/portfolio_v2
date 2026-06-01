# docs/antigravity-context.md
# Antigravity Agent Context Document
# Bangaru Konda Portfolio

**This document is written for AI coding agents.**  
**Read this before touching any file in this project.**

---

## Project Identity

You are building a premium dark portfolio for **Bangaru Konda**, an AI Engineer based in Hyderabad, India.

**Concept:** "The Signal" — intelligence distilled into precision.  
**Target quality:** Awwwards-level. Think Linear.app, Raycast, Framer.com.  
**Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion + Lenis

The design goal is: **minimalist, dark, cinematic, highly interactive, and intentional.**

---

## What This Site Communicates

1. Bangaru is an AI engineer who ships production systems — not a researcher, not a hobbyist
2. His work is precise, high-performance, and well-crafted
3. The portfolio itself IS proof of quality — a sloppy portfolio contradicts the message
4. The motion system signals sophisticated technical taste

---

## Absolute Rules (Never Violate)

These are HARD constraints. Do not deviate for any reason:

### Colors
- Background is always `#0a0a0a` — never pure `#000000`
- Primary text is always `#f0ede8` — never pure `#ffffff`
- The single accent is `#e8a020` (amber) — used sparingly
- No gradients — not even subtle ones, not even "just for the background"
- No glassmorphism — no `backdrop-filter: blur` on cards or panels
- No colored backgrounds on large surface areas

### Typography
- Font must be Geist (loaded via `next/font/google`)
- Hero display text must be weight 200 (ultra-light)
- Never bold text as a primary stylistic choice — weight contrast only where specified
- No `text-transform: uppercase` on body copy or headings
- Negative letter spacing on display type only

### Buttons
- `border-radius: 0` always — no rounded corners on buttons
- No box-shadows on any UI element ever
- Primary CTA has 1px amber border, transparent background by default
- Hover: amber fill, dark text

### Animations
- ALL animations use spring physics via Framer Motion — never CSS `transition` as primary animation
- CSS transitions allowed only for: color changes, opacity micro-interactions
- Never animate width, height, padding, margin — only transform + opacity
- Page load sequence runs exactly once, never repeats
- All animations must have reduced-motion fallbacks

### Architecture
- All content/copy lives in `src/data/` — never hardcode strings in JSX
- All animation variants live in `src/lib/animations/variants.ts`
- All spring configs live in `src/lib/animations/springs.ts`
- All hooks live in `src/hooks/`
- Sections are in `src/components/sections/`
- Small reusable UI pieces are in `src/components/ui/`

---

## Forbidden Patterns

The following patterns will be rejected:

```
❌ Glassmorphism effects on any element
❌ Any gradient (background, text, border)
❌ Rounded buttons (border-radius on buttons)
❌ Box shadows
❌ Particle effects or canvas backgrounds
❌ Typing animation (typewriter effect)
❌ Skill bars / percentage indicators
❌ Timeline with circles and vertical lines
❌ Card grids for projects (use list rows instead)
❌ Emoji in any UI copy
❌ Images in circular crop
❌ Pure #000000 or #ffffff anywhere in the UI
❌ "Inter" as the primary font (use Geist)
❌ Using CSS transitions for entrance animations
❌ Hardcoded copy strings inside JSX components
❌ Importing animations from component files (must come from variants.ts)
❌ window.location navigation (use Next.js Link)
❌ Inline styles for anything except Framer Motion dynamic values
❌ useEffect for animations (use Framer Motion's viewport/scroll tools)
❌ GSAP unless CSS marquee animation is proven insufficient (measure first)
❌ Three.js or WebGL (not needed, would hurt performance)
❌ Any component from shadcn/ui that conflicts with the design system
```

---

## Implementation Priorities

When making trade-offs between these priorities, use this order:

1. **Correctness** — does it render correctly at all viewport sizes?
2. **Performance** — does it run at 60fps? Does it have no layout jank?
3. **Accessibility** — does it work with keyboard nav? Reduced motion?
4. **Fidelity** — does it match the design spec precisely?
5. **Animation polish** — is the motion premium and intentional?

Do not sacrifice #1 or #2 for #5. An interactive portfolio that jitters is worse than a static one.

---

## Technology Constraints

### Framer Motion
- Use `LazyMotion` with `domAnimation` features only (not `domMax`)
- Use `useReducedMotion()` hook for all conditional animation logic
- Scroll-linked animations use `useScroll` + `useTransform` from Framer Motion
- Magnetic effects use `useMotionValue` + `useSpring`
- Never use `animate` strings (e.g., `animate="visible"`) without a `variants` object

### Tailwind CSS
- Extend the config with CSS variable references — don't hardcode colors in Tailwind classes
- Use `@apply` sparingly — only for patterns reused 5+ times
- Responsive prefix order: mobile-first (`base` → `md:` → `lg:` → `xl:`)
- Never use `!important` in Tailwind classes

### Next.js
- Use `'use client'` only where interactivity or browser APIs are required
- Sections with no client-side behavior should be Server Components
- Use `next/image` for ALL images with proper `width`, `height`, `alt`, and `priority` on hero images
- Use `next/font/google` for Geist — never use a CDN `<link>` for fonts
- Use `next/link` for all internal navigation

### Lenis
- Initialize in `SmoothScroll.tsx` client component
- Must be disabled on: mobile devices, `prefers-reduced-motion: reduce`
- RAF loop must be started and cleaned up properly in `useEffect`

---

## Component Behavior Specifications

### Navbar
- Transparent with amber `BK` monogram on left
- Nav links: Work / About / Contact (right side)
- Scroll down > 80px: blur backdrop appears
- Scroll velocity > 4px (down): slides up and hides
- Any upward scroll: slides back down into view
- Active section tracked by Intersection Observer — amber underline indicator

### Hero
- Full viewport height minimum
- Left-aligned content
- Three depth layers for parallax (foreground, mid, background)
- "Bangaru" and "Konda." split across two lines in display type
- Amber period on "Konda."
- Mouse movement creates subtle 3-layer parallax (desktop only)
- Scroll indicator appears after 1200ms delay

### Project Rows
- Horizontal rule between each project
- Hover triggers: image background at 15% opacity, number turns amber, title shifts 6px right
- Direction-aware overlay entry and exit
- Click: route to project URL (opens in new tab) OR expand in place

### Skills Marquee
- Three rows, alternating direction
- CSS animation (not Framer Motion) for the scrolling
- `will-change: transform` on each row
- Pause on hover (`animation-play-state: paused`)
- Amber `·` separator between items

### Contact
- Viewport-height section
- "Let's" and "Collaborate" on two separate lines at 88px
- Magnetic CTA button with 80px attraction radius
- Email as large hoverable text (44px) with animated underline
- Social links row below

### Custom Cursor
- Desktop only (`@media (pointer: fine)`)
- 6px filled dot — direct position (no spring lag on the dot)
- 8px outline ring — spring-lagged (follows with inertia)
- On interactive hover: ring expands to 42px
- On link hover: ring turns amber
- Hides on `prefers-reduced-motion: reduce`
- Never blocks pointer events (`pointer-events: none`)

---

## File Ownership Map

| File | Responsibility | Can agents edit freely? |
|---|---|---|
| `src/app/globals.css` | Design tokens, base reset | Only to add tokens, never remove |
| `src/lib/animations/springs.ts` | Spring physics configs | No — locked values |
| `src/lib/animations/variants.ts` | Framer Motion variants | Extend only, never change existing |
| `src/data/*.ts` | Content and copy | Yes — update freely |
| `src/types/index.ts` | TypeScript interfaces | Add interfaces, never remove |
| `src/components/ui/*.tsx` | Reusable primitives | Edit with care — used everywhere |
| `src/components/sections/*.tsx` | Page sections | Edit freely |
| `tailwind.config.ts` | Tailwind extension | Only extend, never remove tokens |

---

## Quality Checklist for Every Component

Before marking any component complete, verify:

- [ ] Renders correctly on mobile (375px)
- [ ] Renders correctly on desktop (1440px)
- [ ] No animation on reduced motion
- [ ] Keyboard navigable and focus-visible states visible
- [ ] No hardcoded color strings (all using CSS variables)
- [ ] No hardcoded copy strings (all from data/)
- [ ] TypeScript strict mode — no `any` types
- [ ] No `console.log` left in code
- [ ] Uses correct spring from `springs.ts`
- [ ] Uses correct variant from `variants.ts` (if animated)
- [ ] Images use `next/image`
- [ ] Links use `next/link`

---

## Known Edge Cases and Solutions

### Lenis + Framer Motion scroll conflict
- Problem: Lenis and Framer Motion both try to handle scroll
- Solution: Pass Lenis's normalized scroll values to Framer Motion via `useScroll` with `container` ref targeting `document.documentElement`

### Custom cursor on touch devices
- Problem: Touch devices don't have hover/mousemove, cursor flickers
- Solution: Detect `window.matchMedia('(pointer: coarse)')` before mounting cursor component. SSR guard required.

### Geist font loading on Safari
- Problem: Safari sometimes shows FOUT before font is ready
- Solution: `font-display: optional` in next/font config, font is preloaded by default

### Framer Motion and Next.js RSC
- Problem: Framer Motion components require client-side rendering
- Solution: Any component using `motion.*` must have `'use client'` directive. Section wrappers can be server components if they don't animate themselves — only their children need client.

### Marquee infinite loop seam
- Problem: Seamless loop requires exact content duplication
- Solution: Render item list twice in DOM, animate `translateX(0)` to `translateX(-50%)`. The duplicate fills in seamlessly.

### Direction-aware hover on fast cursor movement
- Problem: Rapid cursor movement can cause wrong direction detection
- Solution: Debounce `mouseenter` by 16ms (one frame), recalculate on the debounced event

---

## Data Schemas

### Project
```typescript
interface Project {
  number: string        // '01', '02', etc.
  name: string          // Display name
  type: string          // 'Live Project' | 'Case Study' | 'Open Source'
  year: string          // '2024'
  description: string   // 2-3 sentences
  tech: string[]        // Array of technology names
  projectUrl: string | null
  sourceUrl?: string | null
  images: string[]      // Paths relative to /public
  showProjectLink: boolean
}
```

### Skill Row
```typescript
interface SkillRow {
  items: string[]
  direction: 'left' | 'right'
  speed: 'slow' | 'medium' | 'fast'  // maps to: 40s, 30s, 50s
}
```

### Nav Item
```typescript
interface NavItem {
  label: string
  href: string        // anchor ID: '#work', '#about', '#contact'
}
```

### Social Link
```typescript
interface Social {
  label: string
  url: string
  icon: 'linkedin' | 'github' | 'mail'
}
```
