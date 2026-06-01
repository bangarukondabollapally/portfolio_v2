// File: src/data/meta.ts
import { NavItem, Social, Capability } from '@/types';

export const siteMeta = {
  name: 'Bangaru Konda',
  role: 'AI Engineer',
  tagline: 'Turning complex LLMs into intuitive, high-performance products.',
  email: 'bollapallybangarukonda@gmail.com',
  seo: {
    title: 'Bangaru Konda — AI Engineer',
    description: 'AI Product Engineer specializing in LLM applications, RAG systems, and production AI agents. Building intelligent products that work in the real world.',
    url: 'https://bangarukonda.com', // Replace with final deploy URL
    ogImage: '/images/og/default.png',
  }
};

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' }
];

export const socials: Social[] = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/bangarukondabollapally',
    icon: 'linkedin'
  },
  {
    label: 'GitHub',
    url: 'https://github.com/bangarukondabollapally',
    icon: 'github'
  },
  {
    label: 'Email',
    url: `mailto:${siteMeta.email}`,
    icon: 'mail'
  }
];

export const capabilities: Capability[] = [
  {
    number: '01',
    title: 'AI Agents',
    description: 'Designing autonomous systems that break complex tasks into steps, use tools intelligently, and deliver reliable outcomes without handholding.'
  },
  {
    number: '02',
    title: 'RAG Systems',
    description: 'Building retrieval pipelines that ground language models in real data — answering questions with accuracy instead of hallucination.'
  },
  {
    number: '03',
    title: 'LLM Development',
    description: 'Taking models from API call to production system — fine-tuning, evaluation, prompt pipelines, and monitoring that actually scales.'
  },
  {
    number: '04',
    title: 'Prompt Engineering',
    description: 'Engineering prompts as code — versioned, tested, documented, and optimized for consistent outputs across every use case.'
  }
];
