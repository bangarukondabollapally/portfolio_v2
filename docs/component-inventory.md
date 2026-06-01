# component-inventory.md
# Component Inventory
# Bangaru Konda Portfolio

**Total components:** 19  
**Format:** Component Name → Responsibilities → Props → States → Interactions → Animation Requirements

---

## Layout Components

---

### `Navbar`
**File:** `src/components/layout/Navbar.tsx`  
**Type:** Client Component  
**Rendered in:** `app/layout.tsx`

**Responsibilities:**
- Display brand monogram (BK) and navigation links
- Track which section is currently in viewport
- Show/hide based on scroll velocity
- Apply blur backdrop when scrolled past 80px

**Props:** None (all data from `data/meta.ts`)

**States:**
- `isHidden: boolean` — controls vertical position (0 or -80px)
- `hasScrolled: boolean` — controls backdrop blur visibility
- `activeSection: string` — which section anchor is active

**Interactions:**
- Scroll down fast → hide (slide up)
- Scroll up → reveal (slide down)
- Section enters viewport → underline indicator animates to that link
- Link click → smooth scroll to section (href anchor)
- Link hover → text color transitions to primary

**Animation Requirements:**
- Entrance: `y: -80 → 0`, spring.gentle, delay 200ms after page load
- Hide/reveal: `y: 0 ↔ -80`, spring.gentle
- Active indicator underline: `scaleX: 0 → 1` from left origin, spring.snappy
- Backdrop: `opacity: 0 → 1`, 200ms, on scroll > 80px

---

### `Footer`
**File:** `src/components/layout/Footer.tsx`  
**Type:** Server Component  
**Rendered in:** `app/layout.tsx`

**Responsibilities:**
- Display copyright, minimal attribution
- No navigation, no secondary links

**Props:** None

**States:** None (static)

**Interactions:** None

**Animation Requirements:** None — static render

---

### `CustomCursor`
**File:** `src/components/layout/CustomCursor.tsx`  
**Type:** Client Component  
**Rendered in:** `app/layout.tsx`

**Responsibilities:**
- Track mouse position and render custom cursor overlay
- Expand ring on hover of any interactive element
- Turn amber on hover of links and buttons
- Spring-lag the ring behind the dot
- Hide entirely on mobile/touch devices

**Props:** None

**States:**
- `position: {x, y}` — current mouse position (direct, no spring)
- `isHovering: boolean` — any interactive element hovered
- `isLink: boolean` — hovering a link specifically
- `isHidden: boolean` — pointer events not in window

**Interactions:**
- `document.mousemove` → update position
- `data-cursor="link"` attribute on elements → activate link state
- `data-cursor="magnetic"` → expand ring larger (48px)
- `data-cursor="none"` → hide cursor (over text inputs)
- `prefers-reduced-motion` → hide entirely, restore native cursor

**Animation Requirements:**
- Dot: direct position update (no spring — instant response)
- Ring: spring-lagged position, damping: 24, stiffness: 200
- Ring expand: spring.snappy on ring size
- Ring color: 200ms CSS transition

---

### `SmoothScroll`
**File:** `src/components/layout/SmoothScroll.tsx`  
**Type:** Client Component  
**Rendered in:** `app/layout.tsx`

**Responsibilities:**
- Initialize and manage Lenis smooth scrolling
- Run RAF loop for Lenis
- Disable on mobile and reduced-motion preference
- Clean up on unmount

**Props:**
- `children: React.ReactNode`

**States:** None (effect only)

**Interactions:** Intercepts native scroll, replaces with smooth interpolation

**Animation Requirements:** None (infrastructure)

---

## Section Components

---

### `Hero`
**File:** `src/components/sections/Hero.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render fullscreen hero with name, role, location, tagline
- Orchestrate the page load sequence
- Apply mouse-reactive parallax to three depth layers
- Scroll-link opacity and scale to scroll progress

**Props:** None (content from `data/meta.ts`)

**States:**
- `mousePosition: {x, y}` — normalized (-0.5 to 0.5) for parallax

**Interactions:**
- `document.mousemove` → update parallax layers
- Scroll → fade opacity, scale content slightly, shift tagline Y

**Animation Requirements:**
- Load sequence: see motion-system.md § Page Load Sequence
- Name (line 1): `maskReveal` variant, delay 400ms
- Name (line 2): `maskReveal` variant, delay 480ms
- Role badge: `fadeUp`, delay 700ms
- Location pill: `fadeUp`, delay 750ms
- Tagline: `fadeUp`, delay 900ms
- Scroll indicator: `scaleIn` + pulse, delay 1050ms
- Parallax: scroll-linked `useTransform` values, 3 layers at 0.2x, 0.4x, 1.0x
- Mouse parallax: `useMotionValue` x/y → spring-interpolated per-layer

**Section ID:** `id="hero"`

---

### `About`
**File:** `src/components/sections/About.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render two-column editorial layout
- Left column: sticky section label
- Right column: four capability items that reveal on scroll

**Props:** None (content from `data/meta.ts`)

**States:** None

**Interactions:**
- Viewport entry of each capability item → animate in

**Animation Requirements:**
- Left label: `fadeIn`, triggered on section entry
- Capability items: `staggerContainer` parent, children use `fadeUp`
- Stagger: 0.1s between each capability item
- Trigger: 15% visible threshold

**Section ID:** `id="about"`

---

### `Projects`
**File:** `src/components/sections/Projects.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render list of project rows
- Manage list-level animation orchestration
- Render horizontal rules between projects

**Props:** None (content from `data/projects.ts`)

**States:** None (delegated to `ProjectCard`)

**Interactions:**
- Viewport entry → cascade project rows in

**Animation Requirements:**
- Section header: `maskReveal` on viewport entry
- Project rows: `staggerContainer` with 0.06s between rows
- Each row: `fadeUp` on entry
- Individual row hover: handled by `ProjectCard`

**Section ID:** `id="work"`

---

### `Skills`
**File:** `src/components/sections/Skills.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render three marquee rows with appropriate speeds and directions
- Section-level entrance animation
- Optional scanline texture overlay

**Props:** None (content from `data/skills.ts`)

**States:** None

**Interactions:**
- Hover on any row → pause that row's animation
- Viewport entry → rows fade in sequentially

**Animation Requirements:**
- Row 1 entrance: `fadeIn`, delay 0ms
- Row 2 entrance: `fadeIn`, delay 200ms
- Row 3 entrance: `fadeIn`, delay 400ms
- Marquee motion: CSS animation only (not Framer Motion)
- Row 1: 40s, left direction
- Row 2: 30s, right direction
- Row 3: 50s, left direction
- Hover: CSS `animation-play-state: paused`

**Section ID:** `id="stack"`

---

### `Contact`
**File:** `src/components/sections/Contact.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render fullscreen contact CTA
- Orchestrate "Let's Collaborate" heading reveal
- Render email with hover underline animation
- Mount magnetic CTA button
- Render social links row

**Props:** None (content from `data/meta.ts`)

**States:** None

**Interactions:**
- "Collaborate" hover → color sweeps left to right (amber)
- Email hover → underline expands from left
- CTA button → magnetic pull within 80px

**Animation Requirements:**
- "Let's": `maskReveal`, trigger on section entry
- "Collaborate": `maskReveal`, 120ms after "Let's"
- Email: `fadeUp`, 300ms after heading completes
- Button: `scaleIn`, 400ms after heading completes
- Social links: `staggerContainer` 0.06s, `fadeUp` each
- "Collaborate" color shift: CSS `background-clip: text` animated via Framer Motion `useMotionValue`

**Section ID:** `id="contact"`

---

## UI Components

---

### `MagneticButton`
**File:** `src/components/ui/MagneticButton.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render a button or anchor with magnetic hover physics
- Apply spring-based position offset toward cursor within radius

**Props:**
```typescript
{
  children: React.ReactNode
  href?: string           // If provided, renders as <a>
  onClick?: () => void    // If provided, renders as <button>
  className?: string
  variant?: 'outline' | 'solid'  // default: 'outline'
  magnetStrength?: number        // default: 0.4
  magnetRadius?: number          // default: 80
}
```

**States:**
- `isHovered: boolean`
- `x: MotionValue` — magnetic X offset
- `y: MotionValue` — magnetic Y offset

**Interactions:**
- Mouse within radius → spring-attract toward cursor
- Mouse outside radius → spring back to 0,0
- Click → scale 0.97 brief press

**Animation Requirements:**
- Position: `useMotionValue` + `useSpring(springs.magnetic)`
- Hover enter: border color → amber
- Hover active: background fills amber, text darkens
- Press: scale 0.97, spring.snappy

---

### `TextReveal`
**File:** `src/components/ui/TextReveal.tsx`  
**Type:** Client Component

**Responsibilities:**
- Wrap text content in an `overflow: hidden` container
- Apply `maskReveal` variant when in viewport
- Support delay prop for sequencing

**Props:**
```typescript
{
  children: React.ReactNode
  delay?: number        // default: 0
  className?: string
  once?: boolean        // default: true — only reveal once
  threshold?: number    // default: 0.15
}
```

**States:** Managed by Framer Motion viewport detection

**Interactions:** Viewport entry → trigger reveal

**Animation Requirements:**
- `maskReveal` variant on viewport entry
- Supports delay for sequencing in parent containers
- Reduced motion: simple `fadeIn` instead

---

### `ProjectCard`
**File:** `src/components/ui/ProjectCard.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render single project row (number, name, year, tech tags)
- Manage all hover states for this row
- Direction-aware overlay entry/exit
- Background image reveal on hover

**Props:**
```typescript
{
  project: Project
  index: number        // for stagger animation delay
}
```

**States:**
- `isHovered: boolean`
- `overlayX: MotionValue`
- `overlayY: MotionValue`
- `overlayOpacity: MotionValue`

**Interactions:**
- Mouse enter (directional) → overlay fades in from entry edge
- Mouse leave (directional) → overlay fades out toward exit edge
- Hover → number turns amber, title shifts right 6px, tech tags stagger in
- Click → navigate to project URL (new tab)

**Animation Requirements:**
- Overlay: directional `useMotionValue` x/y, `useSpring(springs.snappy)` on opacity
- Number color: CSS transition 200ms
- Title shift: `x: 0 → 6`, spring.snappy
- Tech tags stagger: 0.04s between tags, `fadeUp` each

---

### `MarqueeRow`
**File:** `src/components/ui/MarqueeRow.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render a single infinite-scrolling text row
- Handle direction (left/right)
- Handle speed (maps to CSS animation duration)
- Pause on hover

**Props:**
```typescript
{
  items: string[]
  direction?: 'left' | 'right'    // default: 'left'
  speed?: 'slow' | 'medium' | 'fast'  // default: 'medium'
  className?: string
}
```

**States:**
- `isPaused: boolean` — hover state

**Interactions:**
- Mouse enter → pause marquee
- Mouse leave → resume marquee

**Animation Requirements:**
- CSS `@keyframes` animation — NOT Framer Motion
- Direction left: `translateX(0) → translateX(-50%)`
- Direction right: `translateX(-50%) → translateX(0)`
- Speed durations: slow=40s, medium=30s, fast=50s
- Seamless loop via content duplication (render items array twice in DOM)

---

### `SectionLabel`
**File:** `src/components/ui/SectionLabel.tsx`  
**Type:** Client Component (for animation) or Server Component (if static)

**Responsibilities:**
- Render `(Label Text)` styled section identifier
- Amber dot marker preceding the text (optional)
- Small, spaced mono type

**Props:**
```typescript
{
  label: string
  withDot?: boolean     // default: false
  className?: string
}
```

**States:** None

**Interactions:** None (decorative)

**Animation Requirements:**
- `fadeIn` on viewport entry, 0.6s duration
- Amber dot (if present): `scaleIn` slightly before text

---

### `ScrollIndicator`
**File:** `src/components/ui/ScrollIndicator.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render animated "scroll down" cue in hero section
- Auto-hide once user has scrolled past threshold

**Props:**
```typescript
{
  hideAfter?: number    // scroll position in px to hide (default: 100)
  className?: string
}
```

**States:**
- `isVisible: boolean` — hides once scrolled

**Interactions:**
- Scroll > `hideAfter` px → fade out and unmount

**Animation Requirements:**
- Mount: `scaleIn`, delay 1050ms
- Idle: gentle pulse animation (opacity 1 → 0.4 → 1, 2s loop)
- Unmount: `fadeIn` reversed
- Reduced motion: no pulse, just static display

---

### `HorizontalRule`
**File:** `src/components/ui/HorizontalRule.tsx`  
**Type:** Client Component

**Responsibilities:**
- Render a decorative horizontal divider line
- Animate from scaleX 0 → 1 on viewport entry

**Props:**
```typescript
{
  className?: string
  delay?: number
}
```

**States:** None

**Interactions:** None

**Animation Requirements:**
- `scaleX: 0 → 1`, origin from left
- Spring: gentle
- Trigger: viewport entry
- Reduced motion: appears instantly (no animation)
