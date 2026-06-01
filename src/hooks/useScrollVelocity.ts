// File: src/hooks/useScrollVelocity.ts
'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const lastScrollY = useRef(0);
  const [velocity, setVelocity] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      
      setVelocity(delta);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, velocity };
}
