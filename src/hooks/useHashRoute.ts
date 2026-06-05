import { useEffect, useState } from 'react';
import { DEFAULT_PAGE, PAGE_ROUTES, type Page } from '@/config/navigation';

/** Delay (ms) before scrolling to an anchor, to let the home sections render. */
const ANCHOR_SCROLL_DELAY = 50;

/**
 * Lightweight hash router. Returns the current {@link Page} and keeps it in sync
 * with `window.location.hash`:
 *   - a registered page route (e.g. `#/team`) swaps the page and scrolls to top;
 *   - any other hash is the home page, and an in-page anchor (e.g. `#services`)
 *     is smooth-scrolled into view once the sections have rendered.
 */
export function useHashRoute(): Page {
  const [page, setPage] = useState<Page>(DEFAULT_PAGE);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const matchedPage = PAGE_ROUTES[hash];

      if (matchedPage) {
        setPage(matchedPage);
        window.scrollTo(0, 0);
        return;
      }

      setPage('home');

      const anchor = hash.replace('#', '');
      if (anchor && anchor !== '/') {
        setTimeout(() => {
          document
            .getElementById(anchor)
            ?.scrollIntoView({ behavior: 'smooth' });
        }, ANCHOR_SCROLL_DELAY);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // sync on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return page;
}
