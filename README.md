# Sumadent Dentist Landing Page

A premium, high-performance, mobile-optimized landing page for a dental clinic in Switzerland. Built with a focus on speed, accessibility, and local trust.

---

## 1. Tech Stack & Tools

* **Core**: React 18/19 (Functional Components & Hooks) + TypeScript (Strict mode)
* **Build Tool**: Vite (Ultra-fast startup and production bundling)
* **Styling**: Vanilla CSS (CSS Custom Properties, mobile-first responsive layout, zero external heavy CSS frameworks)
* **Code Formatting**: Prettier (automated, uniform code styling)
* **Linter**: ESLint (type safety and React hooks analysis)
* **Multilingual support (i18n)**: `react-i18next` for four languages: **Deutsch (de)**, **Englisch (en)**, **Französisch (fr)**, and **Italienisch (it)**.

---

## 2. Key Architecture & Design Decisions

### 📞 MVP Online Booking: Click-to-Call
To maximize mobile conversion rates, keep code complexity low, and optimize site loading speeds, we have simplified the booking flow for the MVP. Instead of complex forms or heavy third-party iframe calendars (like OneDoc or Calendly), the primary Call to Action (CTA) triggers a **direct mobile phone call (`tel:`)**. 

### ⚙️ Centralized Clinic Configuration (`src/config/clinicConfig.ts`)
To ensure consistency and ease of maintenance, all contact information, address details, maps coordinates, and opening hours are centralized in a single file:
* **Single Source of Truth**: Any change in opening hours or the phone number only needs to be updated in `clinicConfig.ts`. All UI components (Header, Contact Section, Footer) automatically inherit the new data.
* **SEO Consistency**: The JSON-LD schema (local business / dentist structured data) and the document metadata are generated at runtime from this configuration plus `src/config/team.ts` by the `<Seo>` component (`src/components/Seo/Seo.tsx`), so Google sees exactly what is rendered on screen — no hand-maintained second copy in `index.html`.
* **Localized metadata**: On every language switch, `<Seo>` updates `<html lang>`, the page title, the meta description and the Open Graph / Twitter tags from the locale files, while the structured `openingHoursStructured` feeds the schema.org `OpeningHoursSpecification`.
* **Structured Data**: This file contains localized properties for transit instructions, addresses, and hours to support all 4 national/expat languages.

---

## 3. Directory Structure

```text
sumadent/
├── brainstorm/             # Brainstorming & architectural planning files
├── public/                 # Static assets (favicons, manifest, etc.)
├── src/
│   ├── assets/             # SVG icons, images, and clinic illustration assets
│   ├── config/             # SINGLE SOURCES OF TRUTH (edit these to change content)
│   │   ├── clinicConfig.ts # Contact info, address, opening hours, transit notes
│   │   ├── languages.ts    # Supported languages (drives i18n + switcher + types)
│   │   ├── team.ts         # Team members (drives Team section + SEO schema)
│   │   ├── services.ts     # Service keys (drives Services cards)
│   │   ├── navigation.ts   # Nav links + page/route definitions
│   │   └── site.ts         # Brand name, logo, social image, site URL
│   ├── components/         # Reusable presentation components (Button, Header, Footer, Seo)
│   ├── sections/           # Landing page modules (Hero, Services, Team, Contact, Impressum)
│   ├── hooks/              # Custom hooks (useIsDesktop, useHashRoute)
│   ├── router/             # PageRouter — maps the current page/layout to sections
│   ├── locales/            # JSON translation dictionaries (de/en/fr/it)
│   ├── styles/             # CSS Variables (design tokens) and global reset styles
│   ├── utils/              # Helpers (structuredData.ts builds the SEO JSON-LD)
│   ├── i18n.ts             # i18next setup (auto-loads every locales/*.json)
│   ├── App.tsx             # Top-level layout (Seo + Header + PageRouter + Footer)
│   └── main.tsx            # React mounting shell
```

> Imports use the `@/` path alias for `src/` (e.g. `@/config/team`), configured in
> `vite.config.ts` and `tsconfig.json`.

---

## 3a. How to Extend the Site

Common content changes are **one-file data edits** — no component code required:

| To… | Edit | Notes |
| --- | --- | --- |
| **Add a language** | Add `src/locales/<code>.json` (copy an existing one), then add the code to `SUPPORTED_LANGUAGES` in `src/config/languages.ts` | i18n, the header switcher, the `LanguageCode` type, and `<html lang>` all update automatically |
| **Add a team member** | Append an object to `TEAM_MEMBERS` in `src/config/team.ts` | Appears in the Team section **and** the SEO `employee[]` schema |
| **Add a service** | Append a key to `SERVICE_KEYS` in `src/config/services.ts` + add `services.categories.<key>.{title,desc}` to every locale | One card renders per key |
| **Change a slogan / any text** | Edit the relevant key in `src/locales/*.json` | No strings are hardcoded in TSX |
| **Change contact info / hours** | `src/config/clinicConfig.ts` | UI, SEO schema & metadata all derive from it |
| **Add a nav link** | Append to `NAV_ITEMS` in `src/config/navigation.ts` + add its `nav.*` label per locale | |
| **Rebrand (name/logo)** | `src/config/site.ts` | |

---

## 4. Getting Started

### Development
Install dependencies and run the local development server:
```bash
npm install
npm run dev
```

### Formatting & Linting
Enforce code formatting and type safety before committing changes:
```bash
# Run Prettier code formatting
npx prettier --write .

# Run ESLint check
npm run lint
```
