"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let globalLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenis;
}

export function setGlobalLenis(instance: Lenis | null) {
  globalLenis = instance;
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return lenisRef;
}

export function scrollToSection(id: string, offset = 0) {
  const element = document.getElementById(id);
  if (!element) return;

  if (globalLenis) {
    globalLenis.scrollTo(element, { offset });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
