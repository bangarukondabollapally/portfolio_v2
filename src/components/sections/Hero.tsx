// File: src/components/sections/Hero.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { siteMeta } from '@/data/meta';
import { springs } from '@/lib/animations/springs';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollIndicator from '@/components/ui/ScrollIndicator';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Mouse Coordinates for Interactive Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse coordinates springs (sluggish inertia springs.slow)
  const springMouseX = useSpring(mouseX, springs.slow);
  const springMouseY = useSpring(mouseY, springs.slow);

  // Scroll Tracking for continuous parallax transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Layer 1 (Foreground - Name & Monogram): Opacity fades out 0 to 35% scroll, subtle drift
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const foregroundY = useTransform(scrollYProgress, [0, 0.4], [0, 60]);

  // Layer 2 (Midground - Tagline, Badges & CTA): Opacity fades out, shifts vertically at 0.4x scroll rate
  const midgroundOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const midgroundY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    setMounted(true);
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      // Normalize values from -0.5 to 0.5
      const x = (e.clientX / clientWidth) - 0.5;
      const y = (e.clientY / clientHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReduced]);

  // 3-Layer Interactive Mouse Parallax Transforms
  const nameParallaxX = useTransform(springMouseX, (x) => prefersReduced ? 0 : x * 24);
  const nameParallaxY = useTransform(springMouseY, (y) => prefersReduced ? 0 : y * 24);

  const contentParallaxX = useTransform(springMouseX, (x) => prefersReduced ? 0 : x * -12);
  const contentParallaxY = useTransform(springMouseY, (y) => prefersReduced ? 0 : y * -12);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[var(--bg)] overflow-hidden pt-20 px-6 md:px-12 lg:px-20"
      aria-label="Introduction Hero"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Layer 1: Foreground display headings */}
        <motion.div
          style={{
            x: nameParallaxX,
            y: foregroundY,
            opacity: foregroundOpacity,
          }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          {/* Choreographed entrance splits */}
          <h1 className="font-display-hero text-[var(--text-primary)] flex flex-col tracking-[-0.04em]">
            <TextReveal delay={0.4} once={true}>
              Bangaru
            </TextReveal>
            <TextReveal delay={0.48} once={true}>
              Konda<span className="text-[var(--accent)] font-bold">.</span>
            </TextReveal>
          </h1>
        </motion.div>

        {/* Layer 2: Midground details, tagline, capability hooks & CTA */}
        <motion.div
          style={{
            x: contentParallaxX,
            y: prefersReduced ? 0 : midgroundY,
            opacity: midgroundOpacity,
          }}
          className="lg:col-span-4 flex flex-col justify-center lg:items-start lg:pl-6 self-center gap-6"
        >
          {/* Monospace Position details & location row */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0.3 } : { ...springs.gentle, delay: 0.7 }}
          >
            <span className="font-technical-meta text-[13px] uppercase px-3 py-1 border border-[var(--border)] text-[var(--text-primary)] select-none">
              {siteMeta.role}
            </span>
            <span className="font-technical-meta text-[13px] text-[var(--text-secondary)]">
              {siteMeta.location}
            </span>
          </motion.div>

          {/* Primary Editorial Positioning Tagline */}
          <motion.p
            className="font-lead text-[var(--text-secondary)] leading-relaxed text-wrap"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0.3 } : { ...springs.gentle, delay: 0.9 }}
          >
            {siteMeta.tagline}
          </motion.p>

          {/* Magnetic CTA trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReduced ? { duration: 0.3 } : { ...springs.cinematic, delay: 1.2 }}
          >
            <MagneticButton
              href="#contact"
              onClick={handleCtaClick}
              className="mt-2"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

        </motion.div>
      </div>

      {/* Ambient Scroll Cue Indicator */}
      {mounted && <ScrollIndicator hideAfter={120} />}

    </section>
  );
}
