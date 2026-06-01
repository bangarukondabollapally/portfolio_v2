// File: src/components/sections/Hero.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
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

  // Layer Transforms
  // Foreground Display Heading: Fades out, subtle downdrift
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const foregroundY = useTransform(scrollYProgress, [0, 0.4], [0, 60]);

  // Midground Content Details (Right Column): Fades, upward translation
  const midgroundOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const midgroundY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Atmospheric Background Text: Fades out, slow downward drift
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5], [0.02, 0]);

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

  // Parallax X/Y Shifts
  const nameParallaxX = useTransform(springMouseX, (x) => prefersReduced ? 0 : x * 20);
  const nameParallaxY = useTransform(springMouseY, (y) => prefersReduced ? 0 : y * 20);

  const contentParallaxX = useTransform(springMouseX, (x) => prefersReduced ? 0 : x * -10);
  const contentParallaxY = useTransform(springMouseY, (y) => prefersReduced ? 0 : y * -10);

  const bgParallaxX = useTransform(springMouseX, (x) => prefersReduced ? 0 : x * -35);
  const bgParallaxY = useTransform(springMouseY, (y) => prefersReduced ? 0 : y * -35);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'auto' });
    }
  };

  const handleTeaserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[var(--bg)] overflow-hidden pt-28 pb-20 px-6 md:px-10"
      aria-label="Introduction Hero"
    >
      {/* 
        Visual Layer: Oversized low-contrast atmosphere typography 
        Drifts slowly behind everything as a tactical atmospheric signal.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.h2
          style={{
            y: bgTextY,
            x: bgParallaxX,
            opacity: bgTextOpacity,
          }}
          className="font-display text-[18vw] font-extrabold tracking-[-0.06em] text-[var(--text-primary)] leading-none uppercase"
        >
          Signal
        </motion.h2>
      </div>

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column (Cols 1-8): Large Display Name & Featured Project Teaser */}
        <div className="lg:col-span-8 flex flex-col justify-center items-start">
          <motion.div
            style={{
              x: nameParallaxX,
              y: foregroundY,
              opacity: foregroundOpacity,
            }}
            className="w-full"
          >
            {/* Extremely massive editorial Display Typography */}
            <h1 className="font-display text-[clamp(60px,11.5vw,176px)] font-extralight tracking-[-0.04em] leading-[0.88] text-[var(--text-primary)] flex flex-col items-start gap-0">
              <TextReveal delay={0.4} once={true}>
                Bangaru
              </TextReveal>
              <TextReveal delay={0.48} once={true}>
                Konda<span className="text-[var(--accent)] font-bold">.</span>
              </TextReveal>
            </h1>
          </motion.div>

          {/* Featured Project Teaser Row - Natural transition into future showcases */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0.3 } : { ...springs.gentle, delay: 1.1 }}
            style={{
              y: useTransform(scrollYProgress, [0, 0.4], [0, 30]),
              opacity: useTransform(scrollYProgress, [0, 0.35], [1, 0]),
            }}
            className="mt-16 w-full max-w-xl border-t border-[var(--border)] pt-8 flex flex-col gap-6 relative group select-none cursor-pointer"
            onClick={handleTeaserClick}
            data-cursor="link"
          >
            {/* Sliding, low-contrast subtle image preview block on Hover */}
            <div className="absolute right-0 bottom-full mb-4 w-60 aspect-video border border-[var(--border)] overflow-hidden bg-[var(--bg-elevated)] opacity-0 scale-95 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-20">
              <Image
                src="/images/projects/prief-ai.png"
                alt="Prief AI Visual Teaser"
                width={240}
                height={135}
                className="object-cover w-full h-full filter brightness-[0.6] contrast-[1.1] grayscale"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 to-transparent" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-technical-meta text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-bold">
                  Featured Project Preview
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              </div>
              <h3 className="font-title-project text-[20px] font-light text-[var(--text-primary)] tracking-wide">
                Prief AI
              </h3>
              <p className="font-technical-meta text-[13px] text-[var(--text-secondary)] leading-relaxed mt-1">
                AI proposal workspace generating Scope-of-Work bundles and projekt packages in seconds.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Cols 9-12): Right-side positioning details block */}
        <motion.div
          style={{
            x: contentParallaxX,
            y: prefersReduced ? 0 : contentParallaxY,
            opacity: midgroundOpacity,
          }}
          className="lg:col-span-4 flex flex-col justify-center lg:items-start lg:pl-4 self-center gap-6"
        >
          {/* Monospace Badge & Location */}
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

          {/* Core Tagline Description */}
          <motion.p
            className="font-lead text-[var(--text-secondary)] leading-relaxed text-wrap"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0.3 } : { ...springs.gentle, delay: 0.9 }}
          >
            {siteMeta.tagline}
          </motion.p>

          {/* Magnetic CTA Action */}
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

      {/* Dynamic Scroll progress indicator */}
      {mounted && <ScrollIndicator hideAfter={140} />}

    </section>
  );
}
