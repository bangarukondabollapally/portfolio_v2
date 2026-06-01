// File: src/components/sections/Contact.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteMeta, socials } from '@/data/meta';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { springs } from '@/lib/animations/springs';

export default function Contact() {
  const prefersReduced = useReducedMotion();

  // Stagger entry configurations
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 28 },
    animate: {
      opacity: 1,
      y: 0,
      transition: springs.gentle,
    },
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-[var(--bg-surface)] border-t border-[var(--border)] flex flex-col justify-between py-28 px-8 md:px-16 lg:px-28 relative"
      aria-label="Contact Workspace"
    >
      {/* Top Label Row */}
      <div className="max-w-[1400px] w-full mx-auto flex justify-start z-10">
        <SectionLabel label="Contact" withDot={true} />
      </div>

      {/* Middle Center Focal Block: Centered Typographic Showcase */}
      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center justify-center text-center my-auto relative z-10 gap-10">
        
        {/* Cinematic Header reveals */}
        <h2 className="font-display text-[clamp(44px,8vw,110px)] font-extralight tracking-[-0.04em] leading-[0.92] text-[var(--text-primary)] flex flex-col items-center">
          <TextReveal delay={0.1}>Let's Build</TextReveal>
          <TextReveal delay={0.24}>Something Useful<span className="text-[var(--accent)] font-bold">.</span></TextReveal>
        </h2>

        {/* Dynamic Stagger Items */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center gap-6 max-w-2xl"
        >
          {/* Email Focal Point with Animated Underline */}
          <motion.a
            variants={itemVariants}
            href={`mailto:${siteMeta.email}`}
            className="font-title-project text-[clamp(20px,4vw,42px)] font-light text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300 relative group py-2"
            data-cursor="link"
          >
            {siteMeta.email}
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </motion.a>

          {/* Sub-text descriptor */}
          <motion.p
            variants={itemVariants}
            className="font-technical-meta text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-md px-4 mt-2"
          >
            Have a project that requires precise AI engineering and technical craft? Let's collaborate.
          </motion.p>

          {/* Magnetic CTA Action */}
          <motion.div
            variants={itemVariants}
            className="mt-4"
          >
            <MagneticButton
              href={`mailto:${siteMeta.email}`}
              className="px-10 py-5"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

        </motion.div>

      </div>

      {/* Bottom Footer Details Row */}
      <div className="max-w-[1400px] w-full mx-auto border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        
        {/* Monospace copyright */}
        <span className="font-micro-print text-[11px] text-[var(--text-tertiary)] tracking-wider">
          © {new Date().getFullYear()} BANGARU KONDA. ALL RIGHTS RESERVED.
        </span>

        {/* Text Editorial Social links */}
        <div className="flex items-center gap-8">
          {socials
            .filter((s) => s.icon !== 'mail')
            .map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-technical-meta text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative group select-none transition-colors duration-200 uppercase tracking-widest"
                data-cursor="link"
              >
                {social.label}
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--text-primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </a>
            ))}
        </div>

      </div>

    </section>
  );
}
