// File: src/app/page.tsx
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[var(--bg)]">
      {/* 1. Typography-first Editorial Hero Section */}
      <Hero />

      {/* 2. Large Editorial Viewport Project Showcases */}
      <Projects />

      {/* 3. Asymmetric Split Grid About Narrative & Capabilities */}
      <About />

      {/* 4. GPU-Composited Three-Row Scrolling Tech Stack */}
      <Skills />

      {/* 5. Fullscreen Cinematic Ending & Magnetic CTA contact */}
      <Contact />
    </div>
  );
}
