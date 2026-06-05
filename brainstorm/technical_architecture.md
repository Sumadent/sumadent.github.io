# Brainstorming: Technical Architecture

Since this is a lightweight landing page designed primarily for mobile performance, our technical stack must focus on **speed, maintainability, and clean architecture**. We will use **React + TypeScript + Vite** for a modern, rapid development environment, combined with **Vanilla CSS** for modular and performant styling.

---

## 1. Core Stack

- **Bundler & Dev Server**: **Vite**
  - Instant Hot Module Replacement (HMR).
  - Out-of-the-box support for TypeScript and CSS modules.
  - Highly optimized roll-up production build.
- **Framework**: **React 18/19** (Functional Components + Hooks).
- **Language & Type Safety**: **TypeScript** (Strict mode) for type-safety and developer productivity.
- **Styling**: **Vanilla CSS** with global custom variables (design tokens).
  - Avoid tailwind or external style libraries to keep the bundle size extremely small.
  - CSS modules or component-level CSS files to keep components isolated.
- **Code Formatting**: **Prettier** for automated, uniform code styling.

---

## 2. Multilingual Support (i18n)

Since Switzerland is multilingual and attracts international residents, we will use **`i18next`** and **`react-i18next`** to manage translations for four languages:
- **Deutsch (de)**
- **Englisch (en)**
- **Französisch (fr)**
- **Italienisch (it)**

### Structure
- **Locale Files**: JSON translation files stored at `src/locales/{de|en|fr|it}.json` for modular and clean text mapping.
- **Detection & Fallback**: Detect user browser language defaults (`i18next-browser-languagedetector`) and fallback to German (`de`). Persist user choice in `localStorage`.
- **Usage Example**:
  ```tsx
  import { useTranslation } from 'react-i18next';

  export function HeroTitle() {
    const { t } = useTranslation();
    return <h1>{t('hero.title')}</h1>;
  }
  ```


---

## 3. SEO & Local Schema (JSON-LD)

To help the clinic rank well in local Swiss search queries (e.g., "Zahnarzt Zürich", "Emergency dentist Basel"), we will include rich metadata and structured data in the HTML:

- **Meta Tags**: SEO titles, meta descriptions, and Open Graph tags for WhatsApp/social sharing.
- **JSON-LD Schema**: Embedded in `index.html` or dynamically generated, defining a `Dentist` / `LocalBusiness` type:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Sumadent",
    "image": "https://www.sumadent.ch/assets/logo.png",
    "telePhone": "+41 44 123 4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bahnhofstrasse 12",
      "addressLocality": "Zürich",
      "postalCode": "8001",
      "addressCountry": "CH"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ]
  }
  ```

---

## 4. Mobile Performance Optimization

To deliver a page that loads in under 1 second on mobile networks in Switzerland:

- **Image Formats**: Convert all photography to WebP or AVIF formats. Use standard system image resolutions and `loading="lazy"` for footer/location visuals.
- **Icon Strategy**: Use raw inline SVG files or a curated collection of React SVG icon components (no heavy font-based icon packages).
- **CSS Transitions**: Stick to `transform` and `opacity` properties for micro-animations to avoid layout repaints and ensure 60fps scrolling on older mobile devices.
- **Minified Build**: Vite automatically handles JS/CSS minification, treeshaking, and code-splitting out of the box.
