# implementation-roadmap.md
# Implementation Roadmap
# Bangaru Konda Portfolio

**Total Phases:** 8  
**Dependency model:** Each phase depends on the completion of the phase before it.  
**Agent instructions:** Complete each phase fully before beginning the next.

---

## Phase 1: Foundation
**Goal:** Bootable Next.js project with full design system in place.  
**Output:** A page that renders the design tokens correctly. Nothing interactive. No sections.  
**Dependency:** None — this is the starting point.

### Tasks

1. **Initialize project**
   - `pnpm create next-app@latest` with TypeScript, Tailwind, App Router, src directory
   - Configure `tsconfig.json` with strict mode and `@/*` path alias
   - Install: `framer-motion`, `lenis`, `lucide-react`
   - Configure `next.config.ts` with image domains and optimization settings

2. **Define TypeScript interfaces**
   - Create `src/types/index.ts`
   - Define: `Project`, `SkillRow`, `NavItem`, `Social`, `Capability`
   - All interfaces must be complete before any component uses data

3. **Populate data files**
   - Create `src/data/projects.ts` — Prief AI project with complete typed data
   - Create `src/data/skills.ts` — three marquee rows with typed arrays
   - Create `src/data/meta.ts` — nav items, socials, site tagline, hero content

4. **Build CSS token system**
   - Define all CSS custom properties in `src/app/globals.css`
   - Token categories: background colors, text colors, accent, borders, spacing, typography
   - Base reset: box-sizing, margin reset, font smoothing, scroll behavior

5. **Configure Tailwind**
   - Create `tailwind.config.ts`
   - Extend theme: colors (map CSS vars), fontFamily (Geist display/mono), spacing (section, gutter), keyframes (grain, marquee-left, marquee-right)

6. **Font loading**
   - Configure Geist via `next/font/google` in `app/layout.tsx`
   - Apply font CSS variables to `<html>` element
   - Verify zero layout shift in dev tools

7. **Create animation system**
   - Create `src/lib/animations/springs.ts` — 5 spring configs
   - Create `src/lib/animations/variants.ts` — all variant objects
   - Create `src/lib/animations/utils.ts` — stagger helpers

8. **Verify foundation**
   - `pnpm dev` runs without errors
   - CSS tokens are accessible in browser
   - TypeScript has zero errors
   - Tailwind compiles correctly

**Phase 1 Complete When:** `localhost:3000` renders a dark page with correct background color, fonts loaded, and zero console errors.

---

## Phase 2: Layout Shell
**Goal:** Persistent layout elements in place — navbar and footer visible, smooth scroll active.  
**Dependency:** Phase 1 complete (tokens, fonts, data)

### Tasks

1. **Root layout assembly**
   - Update `src/app/layout.tsx`
   - Mount `SmoothScroll` wrapper
   - Mount `CustomCursor` (renders null on server, activates client-side)
   - Add `Navbar` and `Footer` to layout
   - Add metadata export with correct SEO values

2. **Build `SmoothScroll` component**
   - Initialize Lenis in `useEffect`
   - RAF loop for Lenis updates
   - Detect mobile + reduced-motion → skip initialization
   - Cleanup on unmount

3. **Build `Navbar` component (static first)**
   - Render monogram and nav links with correct tokens
   - No animation yet — just layout and styling
   - Correct responsive behavior (mobile collapse strategy)

4. **Build `Footer` component**
   - Static Server Component
   - Copyright + attribution text only

5. **Add `CustomCursor` (stub)**
   - Client-side only (check `window` exists before mounting)
   - Render dot and ring overlaid on viewport
   - Track mouse position — no special hover states yet
   - Desktop only check

6. **Verify layout**
   - Nav and footer present
   - Smooth scroll functioning
   - Cursor visible on desktop, absent on mobile
   - No hydration errors

**Phase 2 Complete When:** Layout renders with nav/footer, Lenis scroll is smooth, custom cursor dot follows mouse.

---

## Phase 3: Hero Section
**Goal:** Hero section is fully animated and complete.  
**Dependency:** Phase 2 complete (layout shell, smooth scroll)

### Tasks

1. **Build `TextReveal` UI component**
   - `overflow: hidden` wrapper
   - `maskReveal` variant on child
   - Viewport detection
   - `delay` prop support
   - Reduced motion fallback

2. **Build `ScrollIndicator` UI component**
   - Animated indicator with pulse
   - Auto-hide on scroll

3. **Build `Hero` section (static first)**
   - Full viewport height
   - Left-aligned layout
   - Name split across two lines with amber period on "Konda."
   - Role badge, location pill, tagline
   - Correct typography at all breakpoints

4. **Add Hero parallax system**
   - Three motion layers via `useMotionValue`
   - `useTransform` for scroll-linked opacity and scale
   - Mouse-reactive parallax (desktop only)

5. **Add Hero page load sequence**
   - Precise timing: see motion-system.md § Page Load Sequence
   - Uses `motion.div` with `initial`/`animate` and delay offsets
   - Runs once only

6. **Refine nav entrance**
   - Navbar slides down at 200ms
   - Velocity-sensitive hide/reveal active
   - Blur backdrop appears on scroll

7. **Verify hero**
   - Load sequence plays correctly
   - Parallax smooth on scroll
   - Mouse parallax works on desktop
   - Mobile: no parallax, correct layout
   - Reduced motion: simple fades only

**Phase 3 Complete When:** Hero animates on load, parallax works, typography is correct at all sizes.

---

## Phase 4: Content Sections
**Goal:** About, Projects, and Skills sections are complete and responsive.  
**Dependency:** Phase 3 complete (hero established)

### Tasks

1. **Build `SectionLabel` UI component**
   - `(Label)` format, mono type
   - Optional amber dot
   - `fadeIn` on viewport entry

2. **Build `HorizontalRule` UI component**
   - `scaleX` reveal animation from left
   - Viewport triggered

3. **Build `About` section**
   - Two-column layout (desktop), stacked (mobile)
   - Left: sticky section label (desktop)
   - Right: four capability items from `data/meta.ts`
   - Each capability: number, title, description
   - Stagger animation on scroll entry

4. **Build `ProjectCard` UI component (static first)**
   - Row layout: number / title / year
   - Tech tags below or inline
   - Correct typography, spacing, border

5. **Build `Projects` section**
   - Section header with mask reveal
   - List of `ProjectCard` components
   - `HorizontalRule` between each card
   - Stagger on scroll entry

6. **Build `MarqueeRow` UI component**
   - CSS animation (not Framer Motion)
   - Content duplication for seamless loop
   - Direction and speed props
   - Hover pause

7. **Build `Skills` section**
   - Three `MarqueeRow` components
   - Correct speeds and directions
   - Sequential section-entry fade-in
   - Optional scanline texture

8. **Verify content sections**
   - All three sections render correctly
   - Scroll-triggered animations fire correctly
   - Mobile layouts are clean
   - Content comes from data files (no hardcoded strings)

**Phase 4 Complete When:** All content sections render and animate on scroll, data is all from `data/` files.

---

## Phase 5: Contact Section
**Goal:** Contact section is complete with all interactive elements.  
**Dependency:** Phase 4 complete

### Tasks

1. **Build `MagneticButton` UI component**
   - `useMotionValue` for position
   - `useSpring(springs.magnetic)` on x/y
   - Mouse distance calculation
   - 80px radius attraction zone
   - Strength 0.4
   - Hover states (border → fill)

2. **Build `Contact` section**
   - Full-height section
   - "Let's" + "Collaborate" heading reveal
   - Email link with animated underline
   - Magnetic CTA button
   - Social links row with icons

3. **Add "Collaborate" color sweep**
   - `useMotionValue` tracking hover progress
   - `background-clip: text` technique for color sweep
   - Or simpler: opacity overlay from left to right on hover

4. **Complete social links**
   - Three links: LinkedIn, GitHub, Email
   - Icons from `lucide-react`
   - Hover states
   - Correct `data-cursor="link"` attributes

5. **Verify contact**
   - Magnetic button pulls correctly
   - Heading reveals on section entry
   - Social links work
   - Email opens mail client
   - External links open new tab

**Phase 5 Complete When:** Contact section is fully functional and animated.

---

## Phase 6: Interaction Polish
**Goal:** All hover interactions, cursor states, and project card direction-awareness complete.  
**Dependency:** Phases 3-5 (all sections exist)

### Tasks

1. **Complete `CustomCursor` states**
   - `data-cursor` attribute system
   - Ring expand on interactive hover
   - Amber ring on link hover
   - Larger ring on magnetic zone
   - Spring-lagged ring position

2. **Implement direction-aware hover on `ProjectCard`**
   - Build `useDirectionalHover` hook
   - Edge detection algorithm
   - Directional overlay entry/exit
   - Background image reveal
   - Title shift + number color change

3. **Complete navbar interactivity**
   - Build `useScrollVelocity` hook
   - Active section tracking via IntersectionObserver
   - Underline indicator animation

4. **Add `data-cursor` attributes throughout**
   - All `<a>` elements: `data-cursor="link"`
   - `MagneticButton`: `data-cursor="magnetic"`
   - Text inputs (if any): `data-cursor="none"`

5. **Verify all interactions**
   - Cursor states all work
   - Project cards direction-aware
   - Nav active section tracks correctly
   - Magnetic button pulls correctly

**Phase 6 Complete When:** All interactions work, cursor responds correctly to all element types.

---

## Phase 7: Performance Optimization
**Goal:** 60fps, no jank, optimal bundle size, Lighthouse score > 90.  
**Dependency:** All sections complete (Phase 6 done)

### Tasks

1. **Animation audit**
   - Profile in Chrome DevTools Performance tab
   - Identify any layout-triggering animations
   - Replace any `width`/`height`/`top`/`left` animations with `transform`
   - Add `will-change: transform` to perpetual animations (marquee, cursor, parallax)

2. **Bundle size audit**
   - Analyze with `pnpm build` + `@next/bundle-analyzer`
   - Ensure Framer Motion uses `LazyMotion` with `domAnimation`
   - Code-split heavy sections with `dynamic()` if needed

3. **Image optimization**
   - Convert project images to WebP
   - Set correct `width` and `height` on all `next/image` components
   - Add `priority` to hero images
   - Add `loading="lazy"` to below-fold images (Next.js default)
   - Add blur placeholders

4. **Font optimization**
   - Verify Geist loaded via `next/font` (not CDN link)
   - Check for FOUT in Network tab
   - Ensure `font-display: swap` is configured

5. **Lenis optimization**
   - Verify RAF cleanup on unmount
   - Test mobile scroll performance without Lenis
   - Verify no double scroll events

6. **Core Web Vitals**
   - LCP: hero heading text (< 2.5s)
   - CLS: font loading (must be 0 with next/font)
   - FID/INP: no heavy main thread work on scroll

**Phase 7 Complete When:** Lighthouse performance > 90, no animation jank at 60fps.

---

## Phase 8: Accessibility
**Goal:** WCAG 2.2 AA compliance. No user left behind.  
**Dependency:** Phase 7 (final code structure stable)

### Tasks

1. **Reduced motion audit**
   - Add `useReducedMotion` to every animated component
   - Verify all animations have simplified fallbacks
   - Disable Lenis under reduced motion
   - Disable marquee animation under reduced motion
   - Hide custom cursor under reduced motion

2. **Keyboard navigation audit**
   - Tab through entire page in order
   - Verify all interactive elements are reachable
   - Verify focus-visible rings are visible (amber, 2px)
   - Verify skip-to-main link exists

3. **Semantic HTML audit**
   - One `<h1>` per page (hero name)
   - `<h2>` for section headers
   - `<h3>` for project names
   - Sections use `<section>` with `aria-label`
   - Navigation uses `<nav>` with `aria-label="Main navigation"`
   - Links have descriptive text (no "click here")

4. **Color contrast audit**
   - Run WCAG contrast checker on all text/background combos
   - Verify secondary text (--text-secondary on --bg) meets 4.5:1
   - Verify accent on dark meets 4.5:1

5. **Screen reader test**
   - Test with macOS VoiceOver
   - Project links announce: "Prief AI, Live Project, 2024"
   - Marquee rows are aria-hidden (decorative content)
   - Custom cursor is aria-hidden

6. **Mobile accessibility**
   - Touch targets minimum 44×44px
   - No hover-dependent content on mobile
   - Form elements (contact) have visible labels

**Phase 8 Complete When:** All WCAG 2.2 AA checkpoints pass, keyboard navigation works end to end.

---

## Dependency Graph

```
Phase 1 (Foundation)
    ↓
Phase 2 (Layout Shell)
    ↓
Phase 3 (Hero)
    ↓
Phase 4 (Content Sections)
    ↓
Phase 5 (Contact)
    ↓
Phase 6 (Interaction Polish)
    ↓
Phase 7 (Performance)
    ↓
Phase 8 (Accessibility)
```

No phases can be parallelized without risk — each builds on the previous.

---

## Estimated Complexity Per Phase

| Phase | Complexity | Key Risk |
|---|---|---|
| 1 — Foundation | Low | Config errors, TypeScript strict issues |
| 2 — Layout Shell | Low | Lenis + hydration conflicts |
| 3 — Hero | High | Page load sequence timing, parallax performance |
| 4 — Content | Medium | Data binding, stagger timing, marquee loop seam |
| 5 — Contact | Medium | Magnetic physics tuning |
| 6 — Interactions | High | Direction-aware hover edge cases, cursor state machine |
| 7 — Performance | Medium | Bundle analysis, will-change strategy |
| 8 — Accessibility | Medium | Reduced motion coverage, semantic HTML |
