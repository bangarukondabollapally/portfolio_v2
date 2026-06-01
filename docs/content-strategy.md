# docs/content-strategy.md
# Bangaru Konda Portfolio — Content Strategy

**Version:** 1.0  
**Status:** Authoritative  
**Owner:** Bangaru Konda

---

## 1. Positioning Statement

> "I build AI systems that work in the real world — not demos, not prototypes. Production-grade LLM applications that real users depend on."

Bangaru Konda is not a researcher. Not a theorist. An AI Product Engineer who closes the gap between the capability of language models and the products people actually use.

**Target audience:**
1. **Founding teams at AI-native startups** — need someone who can move fast and ship AI features without hand-holding
2. **Product engineering teams** — need an AI specialist who speaks product, not just papers
3. **Technical hiring managers at growth-stage companies** — need evidence of shipping, not just skills
4. **Freelance/consulting clients** — need someone to own the AI layer of their product

---

## 2. Personal Brand

### Core Attributes

| Attribute | Expression |
|---|---|
| Technical depth | Projects show systems thinking, not surface-level integrations |
| Clarity | Clean writing, clean code, clean design — no fluff |
| Speed | "in seconds", "instantly", "high-performance" — recurring language |
| Autonomy | AI agents that work autonomously is a professional theme AND personal working style |
| Craft | The portfolio itself is proof — design quality signals engineering quality |

### Tone of Voice

**Writing register:** Confident, economical, precise. No hedging. No buzzwords.

| ❌ Don't say | ✅ Say instead |
|---|---|
| "I am passionate about AI" | "I build AI that ships" |
| "Leveraging cutting-edge LLMs" | "Using language models in production" |
| "I have experience in RAG systems" | "I design RAG pipelines that answer questions your codebase actually has" |
| "Full-stack AI developer" | "AI Product Engineer" |
| "I love solving complex problems" | [show the problem you solved in a project] |

**What copy is NOT:**
- Humble-bragging
- Jargon overload
- Long paragraphs that bury the point
- Passive voice
- Anything a template would say

---

## 3. Messaging Hierarchy

### Level 1 — The Hook (Hero, 3 seconds)
Must immediately communicate:
1. Who: Bangaru Konda
2. What: AI Engineer
3. Why they should care: "Turning complex LLMs into intuitive, high-performance products."

This tagline carries the entire first impression. It says:
- "complex LLMs" → I understand the hard stuff
- "intuitive" → I care about users, not just models
- "high-performance" → I care about production, not demos

### Level 2 — The Proof (About section, 30 seconds)
Four capability areas that substantiate the Level 1 claim:

**AI Agents**
Headline: "Autonomous systems that actually work"
Copy direction: Focus on the *outcome* — what agents accomplish for users. Not the tech.

**RAG Systems**
Headline: "Answers grounded in your data"
Copy direction: The value is accuracy and reliability. Lead with that.

**LLM Development**
Headline: "From model to production"
Copy direction: Bridge the gap. This is the hard part. Own it.

**Prompt Engineering**
Headline: "Systematic, repeatable, reliable"
Copy direction: Position prompt engineering as an engineering discipline, not a trick.

### Level 3 — The Evidence (Projects section, 60+ seconds)
Projects must tell a story: problem → approach → outcome.

For each project, define:
1. **What problem it solves** (one sentence, user perspective)
2. **What's technically interesting** (one sentence, engineer perspective)
3. **What it demonstrates** (capability signal)
4. **A number if possible** — "in seconds", "3 document types", "X users"

### Level 4 — The Invitation (Contact section)
Must create a feeling of inevitability. "Of course I should reach out."

**"Let's Collaborate"** is the right framing — not "Hire Me", not "Contact Me". Collaborative framing suggests partnership, not transaction.

---

## 4. Project Storytelling Framework

### Prief AI — Story Template

**One-line for non-technical audience:**
"Turn any client brief into a complete proposal package in seconds."

**One-line for technical audience:**
"Multi-section AI document generation with edge functions, template routing, and structured output pipelines."

**What it demonstrates:**
- Ability to ship a complete product, not just an API wrapper
- Understanding of AI-native UX (proposal generation is the whole experience, not a feature)
- Full-stack competency (React frontend + Supabase + Edge Functions)
- Production deployment (Vercel, live URL)

**Content for project card:**
```
Name:        Prief AI
Type:        Live Project
Year:        2024
Description: AI-powered proposal workspace for freelancers and agencies.
             Transforms client briefs into polished proposals, scopes,
             onboarding docs, and full project bundles in seconds.
Tech:        React · Supabase · Vite · Vercel · Edge Functions
URL:         https://prief.vercel.app
```

### Future Project Template
For each additional project added to the portfolio, use this structure:

```
name:         string           — project name, no tagline
type:         'Live Project' | 'Case Study' | 'Open Source' | 'Freelance'
year:         string           — YYYY
description:  string           — 2-3 sentences max, user outcome first
tech:         string[]         — 4-6 items, most distinctive first
url:          string | null    — live URL or null
sourceUrl:    string | null    — GitHub URL or null
highlight:    string | null    — one remarkable fact or metric
```

---

## 5. Section Content Specifications

### Hero Section

```
Name:     Bangaru Konda
Role:     AI Engineer
Location: Hyderabad, India
Tagline:  Turning complex LLMs into intuitive, high-performance products.
```

Display layout:
- Line 1: "Bangaru" (or full name split across 2 lines depending on viewport)
- Line 2: "Konda." with amber period
- Sub-role: "AI Engineer" in monospace

### About / Capabilities Section

**Section label:** `(What I Do)`
**Intro (optional, above capabilities):** One sentence that bridges hero and capabilities.
Example: "I work at the intersection of language models and product engineering — building systems that think, reason, and ship."

**Capability structure:**
```
01  AI Agents
    Designing autonomous systems that break complex tasks into steps,
    use tools intelligently, and deliver reliable outcomes without handholding.

02  RAG Systems
    Building retrieval pipelines that ground language models in real
    data — answering questions with accuracy instead of hallucination.

03  LLM Development
    Taking models from API call to production system — fine-tuning,
    evaluation, prompt pipelines, and monitoring that actually scales.

04  Prompt Engineering
    Engineering prompts as code — versioned, tested, documented, and
    optimized for consistent outputs across every use case.
```

### Projects Section

**Section label:** `(Work)`
**Intro:** None — let the projects speak
**CTA after list:** Not required — the list itself is the CTA

### Skills / Stack Section

**Section label:** `(Stack)`
**No body copy** — the marquee is the content

Marquee rows:
```
Row 1 (LLM Stack, slow 40s):
LangChain · LlamaIndex · OpenAI · Anthropic Claude · Groq · Mistral · Hugging Face · LangGraph

Row 2 (Frameworks, medium 30s, reverse direction):
Python · TypeScript · React · Next.js · FastAPI · Supabase · PostgreSQL · Redis

Row 3 (Specializations, fast 50s):
RAG Pipelines · Vector DBs · Pinecone · Weaviate · FAISS · Agent Systems · Fine-tuning · Prompt Engineering
```

### Contact Section

```
CTA heading:
  Line 1: "Let's"
  Line 2: "Collaborate"

Sub-copy: "Have a project that needs AI thinking from day one?"
  (optional — can be removed if too verbose)

Email:    bollapallybangarukonda@gmail.com
Button:   "Get in Touch"

Social links:
  LinkedIn: linkedin.com/in/bangarukondabollapally
  GitHub:   github.com/bangarukondabollapally
  Email:    bollapallybangarukonda@gmail.com
```

### Footer

```
Left:   © 2024 Bangaru Konda
Center: [nothing — keep empty]
Right:  Built with Next.js · Deployed on Vercel
```

Minimal. No unnecessary links. No secondary navigation.

---

## 6. SEO & Metadata

### Page Title
```
Bangaru Konda — AI Engineer
```

### Meta Description
```
AI Product Engineer specializing in LLM applications, RAG systems, and
production AI agents. Building intelligent products that work.
```

### Open Graph
```
og:title:       Bangaru Konda — AI Engineer
og:description: AI Product Engineer building LLM applications and RAG systems.
og:image:       /og/default.png (1200×630 — dark background, name, role)
og:type:        website
og:url:         [deploy URL]
```

### Structured Data
Add `Person` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bangaru Konda",
  "jobTitle": "AI Engineer",
  "url": "[deploy URL]",
  "sameAs": [
    "https://linkedin.com/in/bangarukondabollapally",
    "https://github.com/bangarukondabollapally"
  ]
}
```

---

## 7. Content Maintenance Rules

1. **Projects update first** — when adding a new project, update `data/projects.ts` and nothing else
2. **Never update copy inside JSX** — all copy lives in `data/` files
3. **Skills update in `data/skills.ts`** — add new items to the correct marquee row
4. **The tagline is sacred** — do not change "Turning complex LLMs into intuitive, high-performance products." without a strategic review
5. **Add a project only if it has a live URL or documented case study** — no half-finished work
