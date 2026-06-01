# docs/design-system.md
# Bangaru Konda Portfolio — Design System

**Version:** 1.0  
**Status:** Authoritative — agents must not deviate without explicit override  
**Concept:** "The Signal" — precision, clarity, intelligence made tangible

---

## 1. Design Philosophy

This portfolio communicates one thing above all else: signal over noise. Every design decision should reinforce the idea that Bangaru takes complex, chaotic intelligence (LLMs) and distills it into precise, purposeful output.

**Guiding principles:**
- **Restraint over decoration** — nothing decorative exists unless it serves communication
- **Typography as the primary visual element** — layout is built around type, not boxes
- **Motion creates richness** — color and texture are minimal; animation does the heavy lifting
- **Confidence through negative space** — generous whitespace communicates authority, not emptiness
- **Monochrome as luxury** — no gradients, no glassmorphism, no color decorations

**What this design is NOT:**
- Not a creative agency portfolio (avoid expressive color)
- Not a startup landing page (avoid CTA-heavy layouts)
- Not a generic developer portfolio (avoid card grids, skill bars, timeline widgets)
- Not overdesigned (every element earns its place)

---

## 2. Color System

### Primary Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background — near-black, not pure black |
| `--bg-surface` | `#111111` | Elevated surfaces, subtle section backgrounds |
| `--bg-elevated` | `#161616` | Cards, drawers, any 3rd-level elevation |
| `--text-primary` | `#f0ede8` | All primary text — warm off-white, not pure white |
| `--text-secondary` | `#8a8784` | Metadata, labels, captions |
| `--text-tertiary` | `#4a4845` | Disabled states, decorative separators |
| `--accent` | `#e8a020` | Single accent — use surgically only |
| `--accent-dim` | `rgba(232, 160, 32, 0.15)` | Hover states, active backgrounds |
| `--border` | `#1e1e1e` | All borders and dividers |
| `--border-subtle` | `#161616` | Very light separation lines |

### Accent Usage Rules (STRICT)

The amber accent (`#e8a020`) must appear in these contexts ONLY:
1. Active navigation indicator (underline or dot)
2. The period in "Konda." on hero display type
3. Project card number on hover state
4. Section label marker (small decorative dot before section labels)
5. Button border and fill on hover
6. Cursor ring color on interactive hover
7. Marquee row separator characters (·)
8. Link underline animation

**Accent MUST NOT appear:**
- As a background color on large areas
- As text color on body copy
- In any gradient
- On more than one element visible at the same time (except nav + cursor)

### Contrast Ratios (WCAG 2.2 AA)

| Combination | Ratio | Status |
|---|---|---|
| `--text-primary` on `--bg` | 16.8:1 | ✅ AAA |
| `--text-secondary` on `--bg` | 4.7:1 | ✅ AA |
| `--accent` on `--bg` | 6.2:1 | ✅ AA |
| `--text-primary` on `--bg-surface` | 15.1:1 | ✅ AAA |

---

## 3. Typography System

### Font Stack

```
Display headings:  Geist, system-ui, sans-serif
Technical/mono:    Geist Mono, 'Fira Mono', monospace
Body (if needed):  Geist, system-ui, sans-serif
```

**Loading strategy:** Use `next/font/google` with `display: 'swap'` and `preload: true` for Geist. Self-host via next/font to eliminate external request.

### Type Scale

| Level | Size | Weight | Letter Spacing | Line Height | Usage |
|---|---|---|---|---|---|
| `display` | `clamp(72px, 10vw, 144px)` | 200 | `-0.04em` | `0.92` | Hero name |
| `headline` | `clamp(44px, 6.5vw, 88px)` | 200 | `-0.03em` | `0.95` | Section headers, contact CTA |
| `title` | `clamp(28px, 3.5vw, 44px)` | 300 | `-0.02em` | `1.1` | Project titles, sub-sections |
| `body-lg` | `20px` | 400 | `-0.01em` | `1.6` | Lead paragraphs, capability descriptions |
| `body` | `16px` | 400 | `0` | `1.6` | General body text |
| `meta` | `14px` | 400 | `0.02em` | `1.5` | Labels, tags, dates, nav items |
| `micro` | `12px` | 400 | `0.04em` | `1.4` | Fine print, decorative counters |

### Responsive Clamping Rules
- `display`: `clamp(52px, 9vw, 144px)` — never below 52px on mobile
- `headline`: `clamp(36px, 6vw, 88px)` — never below 36px on mobile
- `title`: `clamp(24px, 3.5vw, 44px)` — never below 24px on mobile
- Below these minimums: reduce font weight, not size

### Weight System

| Context | Weight | Notes |
|---|---|---|
| Hero display name | 200 | Ultra-light — maximum elegance |
| Section headers at rest | 200 | Matches hero register |
| Capability titles | 300 | Slightly more weight |
| "Collaborate" in contact (hover) | 600 | Bold appears only on interaction |
| Body text | 400 | Default readable weight |
| Technical mono labels | 400-500 | Mono needs slightly more weight |
| Navigation items | 400 | Keep light |

### Typography Rules (Strict)

1. **Hero display type is never bold.** Weight 200 only. The size creates impact, not the weight.
2. **Never use pure white or pure black.** Always use tokens `--text-primary` and `--bg`.
3. **Letter spacing is negative on display type.** Positive letter spacing is for labels and meta text only.
4. **Line height below 1.0 only on display type.** Body text never goes below 1.5.
5. **Orphan prevention:** Apply `text-wrap: balance` to all heading elements.
6. **Max line length:** Body paragraphs cap at `65ch`. Wide lines on dark backgrounds cause fatigue.

---

## 4. Spacing System

### Base Tokens

```css
--space-1:  6px;
--space-2:  8px;
--space-3:  16px;
--space-4:  28px;
--space-5:  40px;
--space-6:  64px;
--space-7:  96px;
--space-section: 160px;    /* Desktop section vertical padding */
--space-section-sm: 80px;  /* Mobile section vertical padding */
```

### Layout Dimensions

```css
--max-width:       1400px;   /* Page content max width */
--gutter:          80px;     /* Horizontal page padding, desktop */
--gutter-md:       40px;     /* Horizontal page padding, tablet */
--gutter-sm:       24px;     /* Horizontal page padding, mobile */
--nav-height:      64px;     /* Fixed navbar height */
--border-width:    1px;      /* All borders use 1px */
```

### Spacing Principles

- **Section rhythm:** Every section has consistent top+bottom padding using `--space-section`. Never vary per section unless absolutely required.
- **No magic numbers:** If a spacing value isn't in the token list, it shouldn't exist. Use multiples of the base token.
- **Generous internal spacing:** Within sections, elements breathe. Minimum 40px between distinct content groups.
- **No cramped layouts:** If elements feel close, add space. White space is a feature.
- **Asymmetry is intentional:** The 12-column grid allows for left/right weight variation — this is a design choice, not a mistake.

---

## 5. Grid System

### Desktop (>= 1024px)

- 12-column grid
- Max width: 1400px
- Horizontal padding: 80px each side
- Column gap: 24px
- Content columns: 12 usable columns within gutters

### Common Layout Patterns

```
Full width:           cols 1-12
Editorial left:       cols 1-7 (content) / cols 9-12 (label)
Editorial right:      cols 1-4 (label) / cols 6-12 (content)
About split:          cols 1-5 (sticky label) / cols 7-12 (scrolling content)
Project row:          col 1 (number) / cols 2-11 (title) / col 12 (year)
Hero:                 cols 1-10 max (leave right edge for breathing room)
Contact:              cols 1-9 (centered at larger sizes)
```

### Tablet (768px – 1023px)

- 8-column grid
- Horizontal padding: 40px each side
- About split: single column, stacked
- Projects: full width rows, no hover preview

### Mobile (< 768px)

- 4-column grid
- Horizontal padding: 24px each side
- All multi-column layouts collapse to single column
- Section padding reduces to 80px
- Navigation collapses to hamburger (or simplified link row)

---

## 6. Component Design Rules

### General Rules for All Components

1. **Default state must always be defined** — no component exists without a known default appearance
2. **Hover state must always be defined** — even if minimal (opacity change)
3. **Focus-visible state must always be defined** — amber outline, 2px, 3px offset
4. **Active state must be defined** — scale(0.98) on press for interactive elements
5. **Disabled state must be defined** — opacity 0.35, cursor not-allowed, no animations
6. **Loading state must be defined for async elements** — skeleton or spinner using token colors

### Button Component Rules

- **Default:** `background: transparent`, `border: 1px solid --border`, `color: --text-primary`
- **Hover:** `border-color: --accent`, smooth 200ms transition
- **Magnetic active:** border fills amber, text darkens to `--bg`
- **Padding:** `16px 32px` (desktop), `12px 24px` (mobile)
- **Radius:** `0` — no border radius on buttons. Sharp edges communicate precision.
- **Font:** 14px, letter-spacing `0.05em`, uppercase or normal case — not mixed
- **Never use box-shadow on buttons**

### Card/Row Component Rules

- **Borders between rows, not around cards** — horizontal rules, not bordered boxes
- **Background on hover only** — default state has no card background
- **Image reveals on hover** — images are not visible by default in list views
- **No drop shadows** — elevation is communicated through background color shifts, not shadows

### Navigation Rules

- **Transparent background** at page top
- **Blur backdrop** appears after 80px scroll: `backdrop-filter: blur(12px)` with `--bg` at 80% opacity
- **Never use a full opaque background** — the blur effect is the refinement signal
- **Active state:** amber underline slides in from left, 2px height
- **Logo mark:** `BK` monogram, 14px, letter-spacing `0.15em` — NOT a full name

---

## 7. Accessibility Rules

### Motion
- Every animation must respect `prefers-reduced-motion: reduce`
- When reduced motion is active: replace transforms with simple opacity fades
- Lenis smooth scrolling must be disabled under reduced motion
- Custom cursor must be hidden under reduced motion (falls back to system cursor)
- Parallax effects must be disabled under reduced motion

### Keyboard Navigation
- Tab order must follow visual document order
- All interactive elements must be reachable by keyboard
- Custom cursor does not interfere with keyboard navigation
- Magnetic hover effects are mouse-only; keyboard focus uses standard focus ring
- Skip-to-main link must exist (visually hidden, appears on focus)

### Semantic HTML
- `<main>` wraps all page content
- Each section uses `<section>` with unique `aria-label`
- Navigation uses `<nav>` with `aria-label="Main navigation"`
- Project list uses `<ul>/<li>` with appropriate roles
- Contact uses `<address>` for contact information
- Heading hierarchy: one `<h1>` per page, `<h2>` for sections, `<h3>` for subsections

### Color
- Never convey meaning through color alone (always pair with text or icon)
- All interactive states have non-color indicators (underline, border, shape change)

---

## 8. Responsive Behavior Rules

### Desktop-First Interaction Layer
- Custom cursor: desktop only (`@media (pointer: fine)`)
- Magnetic hover: desktop only
- Parallax scroll: desktop only
- Direction-aware hover: desktop only
- Hover-reveal project images: desktop only

### Mobile-First Layout Layer
- Typography scale: fluid via `clamp()`
- All layouts: mobile-stacked, then responsive
- Grid: 4 → 8 → 12 columns as viewport grows
- Touch targets: minimum 44×44px on all interactive elements
- Tap states replace hover states on touch devices (`@media (hover: none)`)

### Breakpoints

```
sm:  640px   — Small phones landscape / large phones
md:  768px   — Tablets
lg:  1024px  — Desktop begins — full grid, hover interactions activate
xl:  1280px  — Wider desktop
2xl: 1536px  — Large displays
```

---

## 9. Image and Asset Rules

### Project Images
- Format: WebP primary, JPEG fallback
- Sizes: provide 2x for retina displays
- Aspect ratio: 16:9 for project previews, locked
- Default state: not visible (revealed on hover or scroll into view)
- Never use generic "laptop mockup" frames — raw screenshots only
- Dark overlay: `rgba(10, 10, 10, 0.6)` always applied, reduces to `0.2` on hover

### Profile Image (if used)
- Editorial crop — square, tight, no circular crop
- High contrast black and white treatment preferred
- Never a casual photo — professional editorial register only

### Icons
- Use `lucide-react` for any icons needed
- Size: 16px for inline, 20px for standalone
- Color: always `currentColor` — inherits from parent
- Never use icon fonts or SVG sprites

---

## 10. Don'ts (Hard Rules)

These patterns are **forbidden** regardless of any instruction:

- ❌ Glassmorphism (frosted glass, backdrop-blur on cards)
- ❌ Color gradients as decorative elements
- ❌ Drop shadows (`box-shadow`) on UI elements
- ❌ Rounded corners on buttons (use `border-radius: 0`)
- ❌ Pure white (`#ffffff`) or pure black (`#000000`) — always use tokens
- ❌ Progress bars / skill percentage bars
- ❌ Timeline widgets with circles and vertical lines
- ❌ "Typing" text animations
- ❌ Particle backgrounds
- ❌ 3D perspective transforms as primary design element
- ❌ Emoji in UI text
- ❌ Star ratings or testimonial carousels
- ❌ Animated GIFs
- ❌ Any component from shadcn/ui that clashes with this aesthetic
