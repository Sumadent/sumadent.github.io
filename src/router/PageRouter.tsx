import type { Page } from '@/config/navigation';
import { Hero } from '@/sections/Hero/Hero';
import { Services } from '@/sections/Services/Services';
import { Team } from '@/sections/Team/Team';
import { Contact } from '@/sections/Contact/Contact';
import { Impressum } from '@/sections/Impressum/Impressum';
import { Booking } from '@/sections/Booking/Booking';

interface PageRouterProps {
  page: Page;
  isDesktop: boolean;
}

/**
 * Decides which sections to render for the current page and layout.
 *
 * The Team section is part of the home page on desktop, but a standalone page on
 * mobile (`#/team`). Everything else falls back to the home page composition.
 */
export function PageRouter({ page, isDesktop }: PageRouterProps): JSX.Element {
  if (page === 'impressum') {
    return <Impressum />;
  }

  if (page === 'booking') {
    return <Booking />;
  }

  if (page === 'team' && !isDesktop) {
    return <Team />;
  }

  return (
    <>
      <Hero />
      <Services />
      {isDesktop && <Team />}
      <Contact />
    </>
  );
}
