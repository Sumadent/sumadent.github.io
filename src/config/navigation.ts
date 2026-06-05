/**
 * Navigation and client-side routing configuration.
 *
 * The app uses lightweight hash routing. Two kinds of hash links exist:
 *   - in-page anchors (e.g. `#services`) that scroll to a section on the home page;
 *   - page routes (e.g. `#/team`) that swap the rendered page.
 *
 * On desktop the Team section lives inline on the home page (anchor `#team`),
 * while on mobile it is its own route (`#/team`) — hence the split hrefs below.
 */

/** Distinct pages the router can render. */
export type Page = 'home' | 'team' | 'impressum';

export const DEFAULT_PAGE: Page = 'home';

/** Maps a `window.location.hash` value to a page. Anything else is the home page. */
export const PAGE_ROUTES: Record<string, Page> = {
  '#/team': 'team',
  '#/impressum': 'impressum',
};

export interface NavItem {
  /** i18n key for the link label. */
  labelKey: string;
  /** Link used in the desktop top navigation. */
  desktopHref: string;
  /** Link used in the mobile dropdown menu. */
  mobileHref: string;
}

/**
 * Top-level navigation links. To add an entry, append an item and provide its
 * `labelKey` translation under `nav.*` in every locale file.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    labelKey: 'nav.services',
    desktopHref: '#services',
    mobileHref: '#services',
  },
  { labelKey: 'nav.team', desktopHref: '#team', mobileHref: '#/team' },
  { labelKey: 'nav.contact', desktopHref: '#contact', mobileHref: '#contact' },
];
