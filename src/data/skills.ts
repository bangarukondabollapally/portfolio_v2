// File: src/data/skills.ts
import { SkillRow } from '@/types';

export const skillsData: SkillRow[] = [
  {
    items: [
      'LangChain',
      'LlamaIndex',
      'OpenAI',
      'Anthropic Claude',
      'Groq',
      'Mistral',
      'Hugging Face',
      'LangGraph'
    ],
    direction: 'left',
    speed: 'slow' // 40s
  },
  {
    items: [
      'Python',
      'TypeScript',
      'React',
      'Next.js',
      'FastAPI',
      'Supabase',
      'PostgreSQL',
      'Redis'
    ],
    direction: 'right', // alternating
    speed: 'medium' // 30s
  },
  {
    items: [
      'RAG Pipelines',
      'Vector DBs',
      'Pinecone',
      'Weaviate',
      'FAISS',
      'Agent Systems',
      'Fine-tuning',
      'Prompt Engineering'
    ],
    direction: 'left',
    speed: 'fast' // 50s
  }
];
