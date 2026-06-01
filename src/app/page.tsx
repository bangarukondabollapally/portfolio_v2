// File: src/app/page.tsx
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[var(--bg)]">
      {/* 1. Typography-first Editorial Hero Section */}
      <Hero />

      {/* 
        Sleek section stubs for Phase 3 review.
        These stubs provide corresponding scroll regions and target IDs so the active section
        indicator tracking, smooth scrolling anchor hops, and custom cursor hover states 
        can be fully evaluated during this initial build review.
      */}
      <section
        id="work"
        className="min-h-screen w-full flex items-center justify-center border-t border-[var(--border)] bg-[var(--bg)] px-6 md:px-12"
      >
        <span className="font-technical-meta text-[var(--text-tertiary)] tracking-[0.2em] uppercase select-none">
          [ 01 / Work Section Placeholder ]
        </span>
      </section>

      <section
        id="about"
        className="min-h-screen w-full flex items-center justify-center border-t border-[var(--border)] bg-[var(--bg-surface)] px-6 md:px-12"
      >
        <span className="font-technical-meta text-[var(--text-tertiary)] tracking-[0.2em] uppercase select-none">
          [ 02 / About Section Placeholder ]
        </span>
      </section>

      <section
        id="stack"
        className="min-h-screen w-full flex items-center justify-center border-t border-[var(--border)] bg-[var(--bg)] px-6 md:px-12"
      >
        <span className="font-technical-meta text-[var(--text-tertiary)] tracking-[0.2em] uppercase select-none">
          [ 03 / Stack Section Placeholder ]
        </span>
      </section>

      <section
        id="contact"
        className="min-h-screen w-full flex items-center justify-center border-t border-[var(--border)] bg-[var(--bg-surface)] px-6 md:px-12"
      >
        <span className="font-technical-meta text-[var(--text-tertiary)] tracking-[0.2em] uppercase select-none">
          [ 04 / Contact Section Placeholder ]
        </span>
      </section>
    </div>
  );
}
