// File: src/components/sections/Skills.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData } from '@/data/skills';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import MarqueeRow from '@/components/ui/MarqueeRow';
import { variants } from '@/lib/animations/variants';

export default function Skills() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="stack"
      className="w-full bg-[var(--bg)] border-t border-[var(--border)] py-28 overflow-hidden relative"
      aria-label="Technical Stack Marquee"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-28 mb-16 flex flex-col gap-6">
        <SectionLabel label="Stack" withDot={true} />
        
        <h2 className="font-headline text-[var(--text-primary)] tracking-[-0.03em] leading-tight">
          <TextReveal delay={0.1}>A focused, production-ready</TextReveal>
          <br />
          <TextReveal delay={0.25}>technical foundation.</TextReveal>
        </h2>
      </div>

      {/* 
        Marquee Stack with visual border separators.
        Alternating marquee rows scroll dynamically, fading in sequentially upon viewport entry.
      */}
      <div className="flex flex-col border-t border-[var(--border)] relative z-10 bg-[var(--bg)]">
        {skillsData.map((row, index) => (
          <motion.div
            key={index}
            variants={variants.fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            custom={prefersReduced ? 0 : index * 0.15}
            className="border-b border-[var(--border)] py-8 flex items-center bg-[var(--bg)] hover:bg-[var(--bg-surface)]/50 transition-colors duration-300"
          >
            <MarqueeRow
              items={row.items}
              direction={row.direction}
              speed={row.speed}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
