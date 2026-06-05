import { useEffect, useState } from 'react';

/** Viewport width (px) at and above which the desktop layout is used. */
export const DESKTOP_BREAKPOINT = 1024;

/**
 * Tracks whether the viewport is at desktop width, updating on resize.
 * Mirrors the `@media (min-width: 1024px)` breakpoint used in the CSS.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= DESKTOP_BREAKPOINT,
  );

  useEffect(() => {
    const handleResize = () =>
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
}
