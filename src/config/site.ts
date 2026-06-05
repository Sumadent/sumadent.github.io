import logo from '@/assets/placeholders/logo.jpeg';
import ogImage from '@/assets/placeholders/placeHolderLandingImage.jpeg';

/**
 * Site-wide identity and branding.
 *
 * Centralizes the brand strings and assets that were previously hardcoded across
 * the Header, Footer, Impressum and SEO metadata, so a rename or rebrand happens
 * in exactly one place.
 */
export const SITE = {
  /** Brand name as shown in the UI and used as logo alt text. */
  brandName: 'SUMADENT',
  /** Legal entity name (used in the Footer / Impressum address block). */
  legalName: 'SUMA DENT',
  /** Public production origin, used to build absolute URLs for SEO tags. */
  url: 'https://www.sumadent.ch',
  /** Brand logo asset. */
  logo,
  /** Image used for social sharing previews (Open Graph / Twitter). */
  ogImage,
} as const;

/** Build an absolute URL from a site-relative asset path (for SEO tags). */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
