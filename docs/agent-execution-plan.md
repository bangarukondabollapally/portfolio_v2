# agent-execution-plan.md
# Antigravity Agent Execution Plan
# Bangaru Konda Portfolio

**This document defines which agents handle which work and in what order.**  
**Agents must not proceed to the next task until the current task passes its verification check.**

---

## Agent Roles

### Agent: Foundation
**Handles:** Project initialization, config, design tokens, data layer, animation system  
**Does NOT handle:** Component code, JSX, visual layout  
**Context file:** `docs/antigravity-context.md` + `project-restructure.md`

### Agent: Layout
**Handles:** Structural shell components — Navbar, Footer, SmoothScroll, root layout  
**Does NOT handle:** Section-level content, animations beyond entrance  
**Context file:** `docs/antigravity-context.md` + `docs/nextjs-architecture.md`

### Agent: Design
**Handles:** Visual implementation of all sections — typography, spacing, grid, component styling  
**Does NOT handle:** Motion beyond static CSS transitions  
**Context file:** `docs/design-system.md` + `component-inventory.md`

### Agent: Motion
**Handles:** All Framer Motion animation implementation — variants, springs, hooks, page load sequence  
**Does NOT handle:** Layout, content, data  
**Context file:** `docs/motion-system.md` + `docs/antigravity-context.md`

### Agent: Components
**Handles:** UI component logic — magnetic button, direction-aware hover, marquee, cursor  
**Does NOT handle:** Section layout, animation system definitions  
**Context file:** `component-inventory.md` + `docs/motion-system.md`

### Agent: Accessibility
**Handles:** Reduced motion, keyboard navigation, semantic HTML audit, ARIA  
**Does NOT handle:** Visual design, animation implementation  
**Context file:** `docs/design-system.md` (§ Accessibility) + `docs/motion-system.md` (§ Reduced Motion)

### Agent: Optimization
**Handles:** Bundle size, image optimization, Lighthouse performance, will-change strategy  
**Does NOT handle:** Design decisions, animation design  
**Context file:** `docs/motion-system.md` (§ Performance) + `project-restructure.md`

---

## Execution Order

### Session 1: Foundation Agent
**Goal:** Working Next.js project with complete design system  
**Read first:** `docs/antigravity-context.md`, `project-restructure.md`

**Execute in order:**
```
1. pnpm create next-app with correct flags
2. Install dependencies: framer-motion, lenis, lucide-react
3. Configure next.config.ts
4. Configure tsconfig.json (strict, path aliases)
5. Configure tailwind.config.ts (extend with CSS var tokens)
6. Create src/types/index.ts (all interfaces)
7. Create src/data/projects.ts
8. Create src/data/skills.ts
9. Create src/data/meta.ts
10. Create src/app/globals.css (tokens + reset)
11. Create src/lib/animations/springs.ts
12. Create src/lib/animations/variants.ts
13. Create src/lib/animations/utils.ts
14. Create src/lib/utils.ts (cn() helper)
```

**Verification:**
- `pnpm dev` runs without errors
- `pnpm build` completes without errors
- TypeScript has 0 errors (`pnpm tsc --noEmit`)
- Background is `#0a0a0a` at localhost:3000

---

### Session 2: Layout Agent
**Goal:** Nav, Footer, SmoothScroll, CustomCursor stub working  
**Read first:** `docs/antigravity-context.md`, `docs/nextjs-architecture.md`  
**Depends on:** Session 1 complete

**Execute in order:**
```
1. Update src/app/layout.tsx (font loading, providers, metadata)
2. Create src/components/layout/SmoothScroll.tsx
3. Create src/components/layout/CustomCursor.tsx (stub — dot only, no states)
4. Create src/components/layout/Navbar.tsx (static first, no animation)
5. Create src/components/layout/Footer.tsx (Server Component)
6. Update src/app/page.tsx (placeholder sections with IDs)
```

**Verification:**
- Nav renders with correct tokens
- Footer renders
- Lenis smooth scroll functions
- Custom cursor dot follows mouse on desktop
- No hydration errors in console
- Mobile: cursor absent, native scroll active

---

### Session 3: Design Agent — Hero + About
**Goal:** Hero and About sections visually complete and correct (no Framer Motion yet)  
**Read first:** `docs/design-system.md`, `component-inventory.md`  
**Depends on:** Session 2 complete

**Execute in order:**
```
1. Create src/components/ui/SectionLabel.tsx (static)
2. Create src/components/ui/HorizontalRule.tsx (static)
3. Create src/components/ui/ScrollIndicator.tsx (static)
4. Create src/components/sections/Hero.tsx (static layout first)
5. Create src/components/sections/About.tsx (static layout)
6. Update src/app/page.tsx to include Hero and About
```

**Verification:**
- Hero: correct typography at 375px, 768px, 1440px
- Hero: amber period on "Konda." visible
- Hero: role badge, location pill, tagline correct
- About: two-column on desktop, stacked on mobile
- About: all 4 capabilities render from data file
- No hardcoded color strings in JSX

---

### Session 4: Design Agent — Projects + Skills + Contact
**Goal:** All remaining sections visually complete (no Framer Motion yet)  
**Read first:** `docs/design-system.md`, `docs/content-strategy.md`  
**Depends on:** Session 3 complete

**Execute in order:**
```
1. Create src/components/ui/ProjectCard.tsx (static, no hover)
2. Create src/components/ui/MarqueeRow.tsx (CSS animation only)
3. Create src/components/ui/MagneticButton.tsx (static, no magnetic yet)
4. Create src/components/sections/Projects.tsx
5. Create src/components/sections/Skills.tsx
6. Create src/components/sections/Contact.tsx
7. Update src/app/page.tsx with all sections
```

**Verification:**
- All sections render from data files
- Projects: number, title, year, tech tags correct
- Skills: three rows with CSS marquee animation
- Skills: marquee pauses on hover
- Contact: heading, email, button, social links present
- Full page scrollable, no layout breaks

---

### Session 5: Motion Agent — System Implementation
**Goal:** All animations implemented — page load sequence, scroll triggers, Framer Motion  
**Read first:** `docs/motion-system.md`, `docs/antigravity-context.md`  
**Depends on:** Session 4 complete (all sections static and correct)

**Execute in order:**
```
1. Create src/hooks/useInView.ts
2. Create src/hooks/useScrollProgress.ts
3. Update src/components/ui/SectionLabel.tsx (add fadeIn animation)
4. Update src/components/ui/HorizontalRule.tsx (add scaleX reveal)
5. Update src/components/ui/ScrollIndicator.tsx (add pulse + hide on scroll)
6. Create src/components/ui/TextReveal.tsx
7. Update src/components/sections/Hero.tsx (full animation system)
   - Page load sequence with correct timing
   - TextReveal on name lines
   - fadeUp on role/tagline
   - Parallax layers
8. Update src/components/sections/About.tsx (scroll-triggered stagger)
9. Update src/components/sections/Projects.tsx (stagger on entry)
10. Update src/components/sections/Skills.tsx (row fade-in stagger)
11. Update src/components/sections/Contact.tsx (heading reveal, social stagger)
12. Update src/components/layout/Navbar.tsx (entrance animation)
```

**Verification:**
- Page load sequence plays correctly (test with Network throttling)
- Hero name reveals with mask effect
- About capabilities stagger in on scroll
- Project rows cascade in on scroll
- Skills rows fade in sequentially
- Contact heading reveals on entry
- No animation jank in Chrome Performance tab
- Reduced motion: all animations simplified

---

### Session 6: Components Agent — Interactions
**Goal:** All interactive behaviors complete — magnetic, direction-aware, cursor states  
**Read first:** `component-inventory.md`, `docs/motion-system.md` (§ Hover System)  
**Depends on:** Session 5 complete

**Execute in order:**
```
1. Create src/hooks/useScrollVelocity.ts
2. Create src/hooks/useMagneticHover.ts
3. Create src/hooks/useDirectionalHover.ts
4. Update src/components/layout/Navbar.tsx
   - Velocity-sensitive hide/reveal
   - Active section IntersectionObserver
   - Animated underline indicator
5. Update src/components/ui/MagneticButton.tsx
   - Full magnetic physics
   - All hover states
6. Update src/components/ui/ProjectCard.tsx
   - Direction-aware hover overlay
   - Background image reveal
   - Title shift, number color
   - Tech tag stagger
7. Update src/components/layout/CustomCursor.tsx
   - All cursor states (default, hover, link, magnetic)
   - Spring-lagged ring
   - data-cursor attribute system
8. Add data-cursor attributes to all interactive elements throughout
```

**Verification:**
- Magnetic button pulls toward cursor within 80px
- Project cards show directional overlay entry
- Cursor ring expands on any interactive element
- Cursor turns amber on links
- Nav hides on fast scroll down, reveals on any up scroll
- Nav underline tracks active section

---

### Session 7: Optimization Agent
**Goal:** Performance optimized, bundle tight, Lighthouse > 90  
**Read first:** `docs/motion-system.md` (§ Performance), `project-restructure.md`  
**Depends on:** Session 6 complete

**Execute in order:**
```
1. Run pnpm build + analyze output
2. Add LazyMotion wrapper if not already in place
3. Audit for layout-triggering animations (use Chrome DevTools)
4. Add will-change: transform to marquee rows + cursor + parallax layers
5. Convert any remaining animated properties to transform/opacity only
6. Optimize all images to WebP, add blur placeholders
7. Verify next/image on all image elements
8. Run Lighthouse in Chrome, document scores
9. Fix any issues below target (> 90 performance)
```

**Verification:**
- Lighthouse Performance > 90
- No layout shifts (CLS = 0)
- No animation jank (60fps in Performance tab)
- Bundle: < 200kb JS gzipped total (excluding Next.js runtime)

---

### Session 8: Accessibility Agent
**Goal:** WCAG 2.2 AA compliance, keyboard nav, reduced motion  
**Read first:** `docs/design-system.md` (§ Accessibility), `docs/motion-system.md` (§ Reduced Motion)  
**Depends on:** Session 7 complete

**Execute in order:**
```
1. Audit heading hierarchy (one h1, correct h2/h3 structure)
2. Add aria-labels to all section elements
3. Add aria-hidden to decorative elements (marquee, cursor, grain)
4. Add skip-to-main link (visually hidden)
5. Test tab order through entire page
6. Verify focus-visible rings on all interactive elements
7. Test with prefers-reduced-motion: reduce
   - Verify all animations simplified
   - Verify Lenis disabled
   - Verify marquee paused
   - Verify cursor hidden
8. Test with keyboard only (no mouse)
9. Run axe DevTools accessibility scanner
10. Fix any violations
```

**Verification:**
- Zero axe violations at AA level
- Full page keyboard-navigable
- Reduced motion: no transform animations active
- Screen reader: sections announced correctly
- Touch targets: all interactive elements ≥ 44×44px on mobile

---

## Rollback Protocol

If any session breaks a previously working state:

1. Do not attempt to fix forward — revert the breaking changes first
2. Identify which specific task caused the break
3. Re-read the relevant spec section
4. Attempt the task again with correct approach

---

## Agent Communication Format

When an agent completes a session, it should output:

```
SESSION [N] COMPLETE

Files created/modified:
- [list]

Verification status:
- [checklist item]: PASS / FAIL

Known issues (if any):
- [description]

Ready for: Session [N+1]
```
