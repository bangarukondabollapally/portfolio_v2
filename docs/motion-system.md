# docs/motion-system.md
# Bangaru Konda Portfolio — Motion System

**Version:** 1.0  
**Status:** Authoritative  
**Philosophy:** Motion communicates intelligence. Every animation has a reason. Nothing decorates. Everything reveals.

---

## 1. Animation Philosophy

Motion in this portfolio serves exactly three purposes:

1. **Reveal sequence** — communicating the order in which information matters
2. **Spatial feedback** — confirming interactions and state changes
3. **Depth storytelling** — creating the sensation of space in a 2D medium

Motion that does none of these three things must be removed.

### The "Weight" Principle
Every animation should feel expensive — like it took effort to move. This means:
- Spring physics, never linear easing
- Slight overshoot on entrances (spring damps naturally)
- Sluggish inertia on scroll-linked values
- Resistance before magnetic snap

### What Motion is NOT for
- Proving technical ability ("look, I can animate")
- Filling empty space
- Drawing attention to secondary elements
- Looping indefinitely on passive elements

---

## 2. Spring Physics System

All interactive and entrance animations use spring physics. Never use `duration`-based easing as the primary parameter.

### Spring Configs

```typescript
// File: src/lib/animations/springs.ts

springs.gentle = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  mass: 1,
}
// USE FOR: content entrances, text reveals, fade-in elements
// FEEL: smooth, unhurried, confident

springs.snappy = {
  type: 'spring',
  damping: 15,
  stiffness: 200,
  mass: 1,
}
// USE FOR: hover states, toggle interactions, button feedback
// FEEL: responsive, crisp, immediate

springs.cinematic = {
  type: 'spring',
  damping: 25,
  stiffness: 80,
  mass: 1,
}
// USE FOR: page load sequence, hero entrance, major transitions
// FEEL: weighty, deliberate, premium

springs.magnetic = {
  type: 'spring',
  damping: 12,
  stiffness: 150,
  mass: 0.5,
}
// USE FOR: cursor magnetic pull, direction-aware hover
// FEEL: physical, attracted, alive

springs.slow = {
  type: 'spring',
  damping: 30,
  stiffness: 60,
  mass: 1.5,
}
// USE FOR: parallax layers, background depth movement
// FEEL: heavy, environmental, background
```

### When to Add `duration`
Only add a `duration` constraint to a spring when:
- The animation is in a stagger sequence (cap individual duration to prevent late completions)
- The animation is on a reduced-motion fallback (use `duration: 0.3`)
- The spring naturally over-runs visually (cap at reasonable length)

---

## 3. Motion Hierarchy

Motion must respect hierarchy — the most important element moves first and most dramatically. Lesser elements follow.

### Priority Levels

**Priority 1 — Page load (most dramatic)**
- Hero name display text
- Role label
- These run on mount, before scroll

**Priority 2 — Scroll entrance (section-level)**
- Section headers entering viewport
- Project list items cascading in
- About section capability items

**Priority 3 — Interaction feedback (responsive)**
- Hover states on project rows
- Magnetic button pull
- Cursor scale change
- Navigation active indicator

**Priority 4 — Ambient (least dramatic)**
- Marquee rows (perpetual, slow)
- Scroll indicator pulse
- Footer decorative elements

### Rules
- Priority 1 and Priority 2 must NEVER run simultaneously
- Priority 3 must always feel faster than Priority 2 (interaction must feel responsive)
- Priority 4 elements must have `will-change: transform` to promote to GPU layer

---

## 4. Variant System

### Core Variants

All variants live in `src/lib/animations/variants.ts`.

**`maskReveal`**
```
Purpose: Primary text entrance. Text slides up from behind a clipping container.
From: y = '101%' (slightly past 100% to prevent bleed)
To:   y = '0%'
Spring: cinematic
Container: overflow: hidden (required on parent)
Use on: Hero name, section headers, major labels
```

**`fadeUp`**
```
Purpose: Secondary content entrance.
From: opacity=0, y=28px
To:   opacity=1, y=0
Spring: gentle
Use on: Body text, capability descriptions, project metadata
```

**`scaleIn`**
```
Purpose: Image and visual element entrance.
From: opacity=0, scale=0.92
To:   opacity=1, scale=1.0
Spring: cinematic
Use on: Project images, any graphic/visual element
```

**`fadeIn`**
```
Purpose: Subtle supporting element entrance.
From: opacity=0
To:   opacity=1
Duration: 0.6s, easing: [0.22, 1, 0.36, 1]
Use on: Borders, rules, decorative elements, secondary nav items
```

**`slideInLeft` / `slideInRight`**
```
Purpose: Directional entrance for paired content.
From: opacity=0, x=±32px
To:   opacity=1, x=0
Spring: gentle
Use on: Split layout columns, left/right paired elements
```

**`staggerContainer`**
```
Purpose: Parent variant that staggers children.
Parameters:
  staggerChildren: number = 0.08  (seconds between each child)
  delayChildren: number = 0       (initial delay before first child)
Use on: Any element whose children animate in sequence
```

**`lineReveal`**
```
Purpose: Single line of hero text.
From: y='100%', opacity=0
To:   y='0%', opacity=1
Spring: cinematic, duration cap: 1.0s
Use on: Individual lines within hero heading
```

---

## 5. Page Load Sequence

This is the most precisely choreographed animation in the portfolio. It runs once on initial page load and never repeats.

### Timeline (absolute, from page-ready)

```
T+0ms     Background fades from pure black to --bg (300ms, opacity only)
T+200ms   Navbar slides down from y=-80 to y=0 (springs.gentle)
T+300ms   Hero section becomes animate-ready (AnimatePresence trigger)
T+400ms   "Bangaru" — mask reveal, line 1
T+480ms   "Konda." — mask reveal, line 2 (80ms after line 1)
T+700ms   Role badge + location pill fade up
T+900ms   Tagline text fades up
T+1050ms  Scroll indicator scales in + begins pulse
T+1200ms  Magnetic hover activates on CTA button (class applied)
```

### Implementation Notes
- Use `motion.div` with `initial`, `animate`, and a `transition` that includes `delay`
- Do NOT use `AnimatePresence` for the initial load — use `animate` prop with delay offsets
- Track "has loaded" in a ref to prevent re-triggering on navigation
- On slow connections, wait for font load before triggering sequence

---

## 6. Scroll-Triggered Animations

### Intersection Observer Settings
```typescript
// For standard content reveals
threshold: 0.15       // 15% of element must be visible
rootMargin: '0px 0px -60px 0px'  // Trigger slightly before fully visible
triggerOnce: true     // Never re-trigger — elements stay visible once seen
```

### Scroll-Linked Values (Framer Motion)
These use `useScroll` + `useTransform` — they are continuous and scroll-reactive, not triggered once.

**Hero Parallax Layers**
```
Layer 1 (foreground — name): no y movement, opacity fades 0→40% scroll
Layer 2 (role/tagline): y moves at 0.4× scroll rate
Layer 3 (background noise/grain): y moves at 0.2× scroll rate

scrollYProgress range: [0, 0.5] maps to full hero to fully scrolled past
name opacity: useTransform([0, 0.3], [1, 0])
tagline y: useTransform([0, 0.5], [0, -80])
scale: useTransform([0, 0.3], [1, 0.96])
```

**Project Row Image Background**
- Not scroll-linked — triggered on hover, not scroll
- See Section 7: Hover System

---

## 7. Hover System

### Project Row Hover (Direction-Aware)

This is the most complex hover interaction. Every project row responds directionally.

**Detection Algorithm:**
```
1. On mouseenter, calculate cursor position relative to element bounds
2. Determine which edge is closest: top, right, bottom, left
3. Set initial overlay position offset in that direction (+/- 20px)
4. Animate overlay to 0,0 (center) with springs.snappy
5. On mouseleave, calculate exit edge
6. Animate overlay back toward exit edge, fade out
```

**Visual result:**
- Background image fades in from the direction of cursor entry
- Project number tints amber (springs.snappy)
- Title shifts right 6px (springs.snappy)
- Tech tags stagger in from bottom (0.04s stagger)

### Magnetic Button System

The magnetic pull system must be implemented with `useMotionValue` and `useSpring`, not with CSS transitions.

**Interaction zone:** 80px radius around button boundaries  
**Strength:** 0.4 (40% of cursor offset applied to button)  
**Spring:** `springs.magnetic`

**Algorithm:**
```
1. Track mouse position globally (or on document mousemove)
2. For each magnetic button, calculate distance from cursor to button center
3. If distance < 80px:
   a. Calculate offset: (cursorX - buttonCenterX) * 0.4
   b. Apply to button x and y via useMotionValue
4. If distance >= 80px: spring back to 0,0
5. On mouseenter: scale button 1.02
6. On mouseleave: scale returns to 1.0
```

**Cursor interaction:**
- When cursor enters magnetic zone: cursor ring expands from 8px to 42px
- When cursor is on button: cursor fills amber
- Cursor ring expands on ANY interactive element (links, buttons)

### Navigation Hover

```
Default:      text color --text-secondary
Hover:        text color --text-primary, 200ms transition
Active section: amber underline slides in from left (x: -100% → 0%)
Spring: snappy
Underline height: 1px
```

---

## 8. Scroll Choreography

### Lenis Configuration
```typescript
new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 2.0,
  infinite: false,
})
```

**Why these values:**
- `duration: 1.2` — longer than default, creates inertia feel
- Custom easing — exponential decay, feels like physical deceleration
- `wheelMultiplier: 0.8` — slightly slower than native, more control
- `touchMultiplier: 2.0` — touch needs more multiplier to feel natural

### RAF Integration
```typescript
// Lenis must run on requestAnimationFrame, not scroll events
function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

### Navigation Velocity Behavior

**Show/hide logic:**
```
scrollY < 80px         → always show nav (near top)
scrollVelocity > +4px  → hide nav (scrolling down fast)
scrollVelocity < -1px  → show nav (any upward scroll)
```

**Animation:** `springs.gentle` on `y` transform (`-80px` hidden, `0px` visible)

### Section Transition Choreography

**Hero → About:**
- Hero content: opacity fades from 1→0 as About section enters viewport
- Hero scale: 1.0 → 0.96 as it exits
- About header: mask reveals as viewport hits 15% of section

**About → Projects:**
- About sticky label: fades out as Projects enters
- Project rows: stagger cascade, first row at 0ms, each subsequent +60ms

**Projects → Skills:**
- Last project row: fades naturally
- Marquee rows: fade in sequentially, Row 1 first (0ms), Row 2 (+200ms), Row 3 (+400ms)

**Skills → Contact:**
- Contact heading: large mask reveal, single line
- "Collaborate" word: opacity pulse on entry

---

## 9. Custom Cursor System

### States

| State | Dot Size | Ring Size | Ring Color | Ring Opacity |
|---|---|---|---|---|
| Default | 6px | 0px | — | 0 |
| Move | 6px | 8px | `--text-tertiary` | 0.4 |
| Hover (interactive) | 4px | 42px | `--text-primary` | 0.8 |
| Hover (link) | 4px | 42px | `--accent` | 1.0 |
| Click | 4px | 36px | `--accent` | 1.0 (scale down) |
| Magnetic zone | 4px | 48px | `--accent` | 0.6 |

### Implementation Notes
- Cursor is a fixed `div` with `pointer-events: none`
- Position tracked with `mousemove` on `document`
- Dot position: direct (no spring — must feel immediate)
- Ring position: spring-lagged (damping: 24, stiffness: 200)
- Cursor is hidden on mobile (`@media (pointer: coarse)`)
- Native cursor hidden via `cursor: none` on `body` (desktop only)
- `data-cursor` attributes on elements signal cursor state changes:
  - `data-cursor="link"` → amber ring
  - `data-cursor="magnetic"` → large ring
  - `data-cursor="none"` → hide both dot and ring (over text inputs)

---

## 10. Marquee Animation

### Configuration

```
Row 1 (LLM Stack):   duration=40s, left-to-right
Row 2 (Frameworks):  duration=30s, right-to-left (opposite direction)
Row 3 (Tools):       duration=50s, left-to-right
```

**Implementation:** CSS `@keyframes` transform translate, NOT JavaScript animation. CSS animation is GPU-composited with zero JS overhead.

**Duplication:** Each row's content is duplicated twice (original + clone) so the loop is seamless.

**Pause on hover:** `animation-play-state: paused` on hover.

**Performance note:** Use `will-change: transform` and `contain: layout` on marquee rows.

---

## 11. Reduced Motion Overrides

When `prefers-reduced-motion: reduce` is detected:

| Animation | Full Motion | Reduced Motion |
|---|---|---|
| Hero name entrance | maskReveal spring | Simple opacity fade, 300ms |
| Content entrance | fadeUp | Simple opacity fade, 200ms |
| Image entrance | scaleIn | Simple opacity fade, 200ms |
| Stagger | 80ms between items | All items fade simultaneously |
| Parallax | Active | Disabled |
| Magnetic | Active | Disabled |
| Direction-aware hover | Active | Simple opacity change |
| Lenis scroll | Active | Disabled (native scroll) |
| Custom cursor | Active | Hidden (native cursor) |
| Marquee | Moving | Paused |
| Page load sequence | Full timeline | Single 400ms fade |

**Implementation pattern:**
```typescript
const prefersReducedMotion = useReducedMotion() // Framer Motion hook

const currentVariants = prefersReducedMotion
  ? reducedMotionVariants
  : fullMotionVariants
```

---

## 12. Performance Constraints

### GPU Layer Rules
These properties ONLY are permitted in animations:
- `transform: translateX/Y/Z` — position
- `transform: scale` — size
- `transform: rotate` — rotation (rare, only if design calls for it)
- `opacity` — visibility

**NEVER animate:**
- `width`, `height` — layout triggers reflow
- `top`, `left`, `bottom`, `right` — position triggers reflow
- `margin`, `padding` — box model triggers reflow
- `border-width` — triggers reflow
- `font-size` — triggers reflow
- `background-color` directly — use opacity overlay instead

### will-change Strategy
```
Add will-change: transform to:
  - Marquee rows (perpetual animation)
  - Parallax layers (continuous scroll-linked)
  - Custom cursor (constant movement)

Do NOT add will-change to:
  - Elements that animate only on scroll-entry (once and done)
  - Static elements
  - More than 6 elements simultaneously
```

### Bundle Size Targets
```
Framer Motion: use LazyMotion + domAnimation (not domMax)
  → saves ~15kb gzipped vs full bundle

GSAP: only load if marquee CSS animation proves insufficient
  → measure first, don't pre-load

Target animation JS: < 40kb gzipped total
```

### Frame Budget
```
Target: 60fps (16.67ms per frame)
Animation budget: < 8ms per frame (leaving 8ms for other work)
If an animation drops below 55fps: simplify or remove
Measure with Chrome DevTools Performance tab, not FPS overlay
```
