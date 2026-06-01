// File: src/data/projects.ts
import { Project } from '@/types';

export const projects: Project[] = [
  {
    number: '01',
    name: 'Prief AI',
    type: 'Live Project',
    year: '2024',
    description: 'AI-powered proposal workspace for freelancers and agencies. Transforms client briefs into polished proposals, scopes of work, onboarding documents, and complete project bundles in seconds.',
    tech: ['React', 'Supabase', 'Vite', 'Vercel', 'Edge Functions'],
    projectUrl: 'https://prief.vercel.app',
    sourceUrl: null,
    images: ['/images/projects/prief-ai.png'],
    showProjectLink: true
  },
  {
    number: '02',
    name: 'AI Agent (LCEL)',
    type: 'Open Source',
    year: '2024',
    description: 'Multi-tool agentic assistant for real-time city queries. LangChain agent dynamically routes between weather API and news search based on query intent — built custom tool-use routing from scratch.',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Tavily'],
    projectUrl: null,
    sourceUrl: 'https://github.com/bangarukondabollapally/ai-agent-lcel',
    images: ['/images/projects/ai-agent-lcel.png'],
    showProjectLink: false
  }
];
