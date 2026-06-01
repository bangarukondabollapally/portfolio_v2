// File: src/components/sections/Projects.tsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/data/projects';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { springs } from '@/lib/animations/springs';

interface ProjectRowProps {
  project: typeof projects[0];
  index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll offset tracker for image parallax and fades
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translation drift on image (-60px to 60px)
  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  
  // Clean clip scale mapping
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  const isEven = index % 2 === 0;

  // Stagger entry configurations
  const textContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: springs.gentle,
    },
  };

  return (
    <div
      ref={rowRef}
      className="relative min-h-[85vh] lg:min-h-screen w-full flex items-center justify-center border-b border-[var(--border)] py-20 px-8 md:px-16 lg:px-28"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Layout Pattern Alternating: Left-Text or Left-Image */}
        {isEven ? (
          <>
            {/* Text details column */}
            <motion.div
              variants={textContainerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Number and Project Class label */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 font-technical-meta text-[13px]">
                <span className="text-[var(--accent)] font-bold text-[14px]">{project.number}</span>
                <span className="text-[var(--text-tertiary)]">/</span>
                <span className="text-[var(--text-secondary)] uppercase tracking-wider">{project.type}</span>
                <span className="text-[var(--text-tertiary)]">/</span>
                <span className="text-[var(--text-secondary)]">{project.year}</span>
              </motion.div>

              {/* Title */}
              <motion.h3 variants={itemVariants} className="font-headline text-[clamp(32px,5vw,56px)] font-light text-[var(--text-primary)]">
                {project.name}
              </motion.h3>

              {/* Short Statement / Description */}
              <motion.p variants={itemVariants} className="font-lead text-[var(--text-secondary)] leading-relaxed">
                {project.description}
              </motion.p>

              {/* Technology Stack Row */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="font-technical-meta text-[12px] px-3 py-1 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] select-none"
                  >
                    {techItem}
                  </span>
                ))}
              </motion.div>

              {/* Primary Link action */}
              {project.showProjectLink && project.projectUrl && (
                <motion.a
                  variants={itemVariants}
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical-meta text-[13px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-200 inline-flex items-center gap-2 select-none"
                  data-cursor="link"
                >
                  Launch Project <span>↗</span>
                </motion.a>
              )}
              {!project.showProjectLink && project.sourceUrl && (
                <motion.a
                  variants={itemVariants}
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical-meta text-[13px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-200 inline-flex items-center gap-2 select-none"
                  data-cursor="link"
                >
                  View Repository <span>↗</span>
                </motion.a>
              )}
            </motion.div>

            {/* Immersive Image showcase column */}
            <div className="lg:col-span-7 w-full overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] aspect-video relative group">
              {project.images.length > 0 ? (
                <>
                  <motion.div
                    style={{
                      y: prefersReduced ? 0 : imageY,
                      scale: prefersReduced ? 1 : imageScale,
                      opacity: imageOpacity,
                    }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={project.images[0]}
                      alt={`${project.name} Product Screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-top filter brightness-[0.8] hover:brightness-[0.95] transition-all duration-500 ease-in-out"
                      priority={index === 0}
                    />
                  </motion.div>
                  {/* Dark overlay: 0.6 resting, 0.2 on hover */}
                  <div className="absolute inset-0 bg-[var(--bg)]/60 group-hover:bg-[var(--bg)]/20 transition-colors duration-500 pointer-events-none z-10" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[var(--bg-elevated)] relative select-none p-6 text-center">
                  <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)] bg-[var(--bg-surface)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-technical-meta text-[11px] text-[var(--text-tertiary)] tracking-[0.25em] uppercase">
                    Awaiting production screenshots
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Immersive Image showcase column (Alternated - Image Left) */}
            <div className="lg:col-span-7 order-2 lg:order-1 w-full overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] aspect-video relative group">
              {project.images.length > 0 ? (
                <>
                  <motion.div
                    style={{
                      y: prefersReduced ? 0 : imageY,
                      scale: prefersReduced ? 1 : imageScale,
                      opacity: imageOpacity,
                    }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={project.images[0]}
                      alt={`${project.name} Product Screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-top filter brightness-[0.8] hover:brightness-[0.95] transition-all duration-500 ease-in-out"
                    />
                  </motion.div>
                  {/* Dark overlay: 0.6 resting, 0.2 on hover */}
                  <div className="absolute inset-0 bg-[var(--bg)]/60 group-hover:bg-[var(--bg)]/20 transition-colors duration-500 pointer-events-none z-10" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[var(--bg-elevated)] relative select-none p-6 text-center">
                  <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)] bg-[var(--bg-surface)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-technical-meta text-[11px] text-[var(--text-tertiary)] tracking-[0.25em] uppercase">
                    Awaiting production screenshots
                  </span>
                </div>
              )}
            </div>

            {/* Text details column (Alternated - Text Right) */}
            <motion.div
              variants={textContainerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6"
            >
              {/* Number and Project Class label */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 font-technical-meta text-[13px]">
                <span className="text-[var(--accent)] font-bold text-[14px]">{project.number}</span>
                <span className="text-[var(--text-tertiary)]">/</span>
                <span className="text-[var(--text-secondary)] uppercase tracking-wider">{project.type}</span>
                <span className="text-[var(--text-tertiary)]">/</span>
                <span className="text-[var(--text-secondary)]">{project.year}</span>
              </motion.div>

              {/* Title */}
              <motion.h3 variants={itemVariants} className="font-headline text-[clamp(32px,5vw,56px)] font-light text-[var(--text-primary)]">
                {project.name}
              </motion.h3>

              {/* Short Statement / Description */}
              <motion.p variants={itemVariants} className="font-lead text-[var(--text-secondary)] leading-relaxed">
                {project.description}
              </motion.p>

              {/* Technology Stack Row */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="font-technical-meta text-[12px] px-3 py-1 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] select-none"
                  >
                    {techItem}
                  </span>
                ))}
              </motion.div>

              {/* Primary Link action */}
              {project.showProjectLink && project.projectUrl && (
                <motion.a
                  variants={itemVariants}
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical-meta text-[13px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-200 inline-flex items-center gap-2 select-none"
                  data-cursor="link"
                >
                  Launch Project <span>↗</span>
                </motion.a>
              )}
              {!project.showProjectLink && project.sourceUrl && (
                <motion.a
                  variants={itemVariants}
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical-meta text-[13px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-200 inline-flex items-center gap-2 select-none"
                  data-cursor="link"
                >
                  View Repository <span>↗</span>
                </motion.a>
              )}
            </motion.div>
          </>
        )}

      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="w-full bg-[var(--bg)] border-t border-[var(--border)] pt-28">
      {/* Editorial Section Header */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-28 mb-16 flex flex-col gap-6">
        <SectionLabel label="Work" withDot={true} />
        
        <h2 className="font-headline text-[var(--text-primary)] tracking-[-0.03em] max-w-3xl leading-tight">
          <TextReveal delay={0.1}>Precise. High-performance.</TextReveal>
          <br />
          <TextReveal delay={0.25}>Systems that run in production.</TextReveal>
        </h2>
      </div>

      {/* Render Viewport-height Project Showcases */}
      <div className="flex flex-col w-full">
        {projects.map((project, index) => (
          <ProjectRow key={project.number} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
