# Project Conventions: Sumadent Landing Page

This document outlines the coding standards, style guidelines, and development workflows for the Sumadent project (React + TypeScript). Adhering to these conventions ensures consistency, readability, and high quality across the codebase.

---

## 1. Project Architecture & Directory Structure

We follow a clean, modular structure optimized for a single-page app (SPA) landing page.

```text
sumadent/
├── brainstorm/             # Brainstorming and planning files
├── public/                 # Static assets (favicons, manifest, etc.)
├── src/
│   ├── assets/             # Images, icons, and illustrations
│   ├── config/             # Static configurations
│   │   └── clinicConfig.ts # Single source of truth for phone, opening hours, etc.
│   ├── components/         # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── index.ts
│   │   └── ...
│   ├── sections/           # Large landing page sections
│   │   ├── Hero/
│   │   ├── Services/
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles and design tokens
│   │   ├── variables.css
│   │   └── global.css
│   ├── utils/              # Helper functions
│   ├── App.tsx             # Main entry component
│   ├── main.tsx            # React DOM mounting
│   └── vite-env.d.ts       # Vite types
├── conventions.md          # This file
├── index.html              # HTML shell
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---


## 2. Naming Conventions

### File & Directory Names
- **React Components / Sections**: PascalCase (e.g., `HeroSection.tsx`, `AppointmentModal.tsx`).
- **Styles / CSS Files**: Match the component name in PascalCase or lowercase for globals (e.g., `HeroSection.css`, `variables.css`).
- **Hooks**: camelCase prefixed with `use` (e.g., `useScrollLock.ts`).
- **Utility / Helper Files**: camelCase (e.g., `dateFormatter.ts`).
- **Assets**: kebab-case (e.g., `clinic-exterior.jpg`, `swiss-cross-icon.svg`).

### Code Identifiers
- **Components & Interfaces**: PascalCase (e.g., `interface ButtonProps {}`).
- **Functions & Variables**: camelCase (e.g., `const handleClick = () => {}`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `const SWISS_EMERGENCY_PHONE = '+41 44 123 45 67'`).
- **CSS Custom Properties (Variables)**: kebab-case with `--` prefix (e.g., `--color-swiss-red`).

---

## 3. TypeScript Guidelines

- **Strict Mode**: `strict` must be set to `true` in `tsconfig.json`. Avoid `any` at all costs. Use `unknown` or specify explicit types.
- **Component Definitions**: Use standard functions with explicit return types for clarity:
  ```tsx
  interface Props {
    label: string;
    onClick: () => void;
  }

  export function Button({ label, onClick }: Props): JSX.Element {
    return <button onClick={onClick}>{label}</button>;
  }
  ```
- **Type vs Interface**:
  - Use `interface` for component props and public API contracts (extendable).
  - Use `type` for unions, intersections, utilities, and action types.
- **Imports**: Prefer absolute path imports if configured, or clean relative paths. Group imports:
  1. React and third-party libraries.
  2. Local components and sections.
  3. Custom hooks and utils.
  4. Styles and assets.

---

## 4. HTML & CSS / Styling Rules

Following our premium design system instructions, we will use **Vanilla CSS** and leverage modern CSS features:

- **Custom Properties (Design Tokens)**: Define color palettes, typography, spacing, and transitions in `src/styles/variables.css`.
- **Mobile-First CSS**: Write styles targeting mobile layout first. Use `@media (min-width: ...)` to scale up to tablet and desktop.
  ```css
  /* Mobile default styles */
  .hero-container {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  /* Desktop enhancement */
  @media (min-width: 1024px) {
    .hero-container {
      padding: 4rem;
      flex-direction: row;
    }
  }
  ```
- **Naming CSS Classes**: Use BEM (Block-Element-Modifier) or scoped component files to prevent style leakage:
  - Block: `.card`
  - Element: `.card__title`
  - Modifier: `.card__title--active`
- **Avoid Inline Styles**: Inline styles are permitted only for dynamic, JS-calculated values (e.g., setting a dynamic height or custom offset during drag/scroll events).

## 5. React Best Practices

- **Functional Components & Hooks**: Class components are prohibited.
- **State Location**: Lift state up only when necessary. Keep state localized to the smallest component possible.
- **Performance**:
  - Memoize expensive calculations with `useMemo`.
  - Use `useCallback` when passing callbacks to memoized children.
  - Optimize image loading: use `loading="lazy"` for below-the-fold images.
- **Multilingual Structure (i18n)**:
  - We support four national/international languages: **Deutsch (de)**, **Englisch (en)**, **Französisch (fr)**, and **Italienisch (it)**.
  - Use `react-i18next` / `i18next` for translation management.
  - All static texts, placeholders, and error messages must be extracted to i18n JSON files (e.g., `locales/de.json`, `locales/en.json`, etc.). Do not hardcode strings inside TSX files.

---

## 6. Code Formatting & Quality Assurance

- **Code Formatter (Prettier)**: Prettier is used for all code formatting. It is enforced to ensure code styling consistency.
  - A `.prettierrc` configuration file must be present at the project root.
  - Code must be formatted prior to commits. Standard settings: single quotes (`singleQuote: true`), semi-colons (`semi: true`), tab width (`tabWidth: 2`), and trailing commas (`trailingComma: 'all'`).
- **Code Linter (ESLint)**: ESLint configures typescript-eslint and React rules to guarantee type safety and code quality.

---

## 7. Accessibility (a11y) & SEO

To align with modern web design standards and guarantee a high-quality Swiss site:
- **Semantic HTML**: Use `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>` instead of wrapping everything in `<div>` elements.
- **Clickable elements**: Ensure interactive items are either actual `<button>` or `<a>` tags with valid `href` values.
- **Alt Texts**: Every image must have a descriptive `alt` attribute. Decorational icons should have `aria-hidden="true"`.
- **Keyboard Navigation**: Ensure custom modals, dropdowns, and buttons are focusable and navigable with the `Tab` and `Enter`/`Space` keys.
- **Contrast**: Ensure text colors maintain at least WCAG AA compliance against their backgrounds (minimum contrast ratio of 4.5:1).

---

## 8. Git Workflow & Commit Guidelines

We enforce the **Conventional Commits** specification:

- `feat:` A new feature.
- `fix:` A bug fix.
- `docs:` Documentation changes only (e.g., updating README or brainstorm files).
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, CSS changes).
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `perf:` A code change that improves performance.
- `test:` Adding missing tests or correcting existing tests.
- `chore:` Changes to the build process, tool configuration, or auxiliary libraries.

*Example*: `feat(contact): add interactive map and click-to-call mobile buttons`
