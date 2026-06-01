# Bent

## Mission
Create implementation-ready, token-driven UI guidance for Bent that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: Bent
- URL: https://bent-template.webflow.io/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Inter`, `font.family.stack=Inter, sans-serif`, `font.size.base=18px`, `font.weight.base=500`, `font.lineHeight.base=28.8px`
- Typography scale: `font.size.xs=18px`, `font.size.sm=20px`, `font.size.md=44px`, `font.size.lg=88px`, `font.size.xl=144px`
- Color palette: `color.border.default=#1e1e21`, `color.text.secondary=#ffffff`, `color.text.tertiary=#f5f3ef`, `color.text.inverse=#111111`, `color.surface.base=#000000`
- Spacing scale: `space.1=6px`, `space.2=8px`, `space.3=16px`, `space.4=28px`
- Radius/shadow/motion tokens: `radius.xs=3px`, `radius.sm=50px`, `radius.md=500px` | `shadow.1=rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px` | `motion.duration.instant=200ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (37), buttons (22).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
