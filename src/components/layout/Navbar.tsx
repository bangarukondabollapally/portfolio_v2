// File: src/components/layout/Navbar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, siteMeta } from '@/data/meta';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';
import { springs } from '@/lib/animations/springs';

export default function Navbar() {
  const { scrollY, velocity } = useScrollVelocity();
  const [activeSection, setActiveSection] = useState('hero');
  const [hasLoaded, setHasLoaded] = useState(false);

  // Velocity-sensitive show/hide states
  const isHidden = scrollY > 80 && velocity > 4;
  const hasScrolled = scrollY > 80;

  // Track initial load sequence delay
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver to track which section is currently in view
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'about', 'stack', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active reading area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' }); // SmoothScroll handles the rest
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 h-16 z-[9980] border-b transition-colors duration-300 flex items-center justify-between px-6 md:px-12 lg:px-20 ${
        hasScrolled
          ? 'bg-[var(--bg)]/80 backdrop-blur-md border-[var(--border)]'
          : 'bg-transparent border-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: isHidden ? -80 : 0 }}
      transition={hasLoaded ? springs.gentle : { ...springs.gentle, delay: 0.2 }}
    >
      {/* Brand Monogram */}
      <a
        href="#hero"
        onClick={(e) => handleLinkClick(e, '#hero')}
        className="font-technical-meta text-[14px] font-bold tracking-[0.15em] text-[var(--text-primary)] select-none cursor-pointer"
        data-cursor="link"
      >
        BK<span className="text-[var(--accent)]">.</span>
      </a>

      {/* Navigation links */}
      <nav aria-label="Main navigation" className="flex items-center space-x-6 md:space-x-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace('#', '');
          
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`relative py-2 font-technical-meta text-[13px] tracking-wide select-none cursor-pointer transition-colors duration-200 ${
                isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              data-cursor="link"
            >
              {item.label}
              
              {/* Active underlining indicator - layoutId slides seamlessly */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)]"
                    transition={springs.snappy}
                  />
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </nav>
    </motion.header>
  );
}
