# Bangaru Konda Portfolio — Documentation System
## Antigravity-Optimized Architecture Specification

**Total docs:** 9 files · 3,200+ lines  
**Purpose:** Complete implementation specification for Antigravity agents  
**Status:** Ready for implementation

---

## How to Use This Documentation

### For Antigravity Agents
1. Read `docs/antigravity-context.md` FIRST — always. Every session.
2. Read the phase-specific spec before starting work
3. Follow `agent-execution-plan.md` for session order
4. Never deviate from the design system or motion system constraints

### For Human Developers
1. Start with `project-restructure.md` for the big picture
2. Use `implementation-roadmap.md` to understand phase dependencies
3. Reference `component-inventory.md` before building any component
4. `docs/design-system.md` and `docs/motion-system.md` are the creative law

---

## Document Index

| File | Purpose | Read When |
|---|---|---|
| `project-restructure.md` | Migration path, tech decisions, folder structure | Session start, architecture questions |
| `docs/design-system.md` | Colors, typography, spacing, component rules | Before any visual implementation |
| `docs/motion-system.md` | Animations, springs, hover system, scroll choreography | Before any animation work |
| `docs/content-strategy.md` | Copy, messaging, project storytelling | Before writing any text content |
| `docs/antigravity-context.md` | Agent context, rules, forbidden patterns, data schemas | Every session, always |
| `docs/nextjs-architecture.md` | Folder structure, component boundaries, config | Before writing any component |
| `component-inventory.md` | Every component: props, states, interactions, animations | Before building any component |
| `implementation-roadmap.md` | 8 phases, tasks, verifications, dependency order | Session planning |
| `agent-execution-plan.md` | Which agent does what, session order, verification format | Workflow orchestration |

---

## Design Concept

**"The Signal"** — an AI engineer who takes raw, chaotic intelligence and distills it into precise, purposeful output.

- Background: `#0a0a0a`
- Text: `#f0ede8`
- Accent: `#e8a020` (amber, used surgically)
- Font: Geist (ultra-light display, mono technical)
- Motion: Spring physics, mask reveals, magnetic interactions
- Quality target: Awwwards / Linear.app level

---

## Tech Stack

```
Next.js 14 (App Router)
TypeScript (strict)
Tailwind CSS + CSS Variables
Framer Motion (LazyMotion + domAnimation)
Lenis (smooth scroll)
Lucide React (icons)
Vercel (deployment)
```

---

## Absolute Constraints (Summary)

❌ No gradients  
❌ No glassmorphism  
❌ No rounded buttons  
❌ No box-shadows  
❌ No pure #000 or #fff  
❌ No hardcoded copy in JSX  
❌ No CSS transitions as primary animations  
❌ No layout-triggering animation properties  
✅ All animations: transform + opacity only  
✅ All copy: from data/ files  
✅ All variants: from lib/animations/variants.ts  
✅ All springs: from lib/animations/springs.ts  
✅ prefers-reduced-motion: handled everywhere  
