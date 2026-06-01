// File: src/components/sections/About.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { capabilities, siteMeta } from '@/data/meta';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { springs } from '@/lib/animations/springs';

export default function About() {
  const prefersReduced = useReducedMotion();

  // Stagger reveal animations for the lower capability blocks
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: springs.gentle,
    },
  };

  return (
    <section
      id="about"
      className="w-full bg-[var(--bg-surface)] border-t border-[var(--border)] py-28 px-8 md:px-16 lg:px-28"
      aria-label="About and Capabilities"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-20">
        
        {/* Upper Editorial Row: Split 12-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column (Cols 1-6): Section Identifier & Dominant Display Heading */}
          <div className="lg:col-span-6 flex flex-col gap-6 items-start">
            <SectionLabel label="About" withDot={true} />
            
            <h2 className="font-headline text-[var(--text-primary)] tracking-[-0.03em] leading-tight">
              <TextReveal delay={0.1}>Building AI products</TextReveal>
              <br />
              <TextReveal delay={0.25}>beyond prototypes.</TextReveal>
            </h2>
          </div>

          {/* Right Column (Cols 7-12): Narrative Philosophy & Craft */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pt-12 font-body-text text-[var(--text-secondary)] leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springs.gentle, delay: 0.2 }}
            >
              I work at the intersection of language models and high-fidelity product engineering — closing the gap between the capability of foundation models and products people actually love. I design and build production-grade LLM applications that solve concrete, real-world problems.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springs.gentle, delay: 0.35 }}
            >
              For me, AI engineering is not about writing quick API wraps. It is an engineering discipline — requiring structured routing, rigorous evaluation metrics, clean retrieval pipelines, and performant agent orchestration. The goal is always to deliver focused, predictable, and robust outcomes.
            </motion.p>
          </div>

        </div>

        {/* Lower Capability blocks: 4-Column Bent Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mt-10 pt-16 border-t border-[var(--border)]"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.number}
              variants={cardVariants}
              className="flex flex-col items-start gap-4"
            >
              {/* Oversized Numbering */}
              <span className="font-display text-[64px] font-extralight text-[var(--accent)] leading-none select-none">
                {cap.number}
              </span>
              
              {/* Title */}
              <h3 className="font-title-project text-[20px] font-light text-[var(--text-primary)] tracking-wide">
                {cap.title}
              </h3>
              
              {/* Description */}
              <p className="font-technical-meta text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
