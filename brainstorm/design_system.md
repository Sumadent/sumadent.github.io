# Swiss Minimalist Design System: Sumadent

This document establishes the official visual design tokens, styles, and UI rules for Sumadent. The design is directly inspired by the provided logo: **clinical precision, deep trust, and clean geometric structures** using a **Classic Swiss Minimalist (International Typographic Style)** aesthetic.

---

## 1. Logo & Design DNA Analysis

* **Logo Iconography**: A white tooth contour forming an elegant letter **"S"** with a sharp, geometric **8-pointed star** at the top-left cusp.
* **Dominant Color**: A deep, luxurious, and trust-inducing **Navy Blue** (derived from the logo background).
* **Core Philosophy**: 
  - **Asymmetric Grid Layouts**: Clean, grid-based alignment that feels editorial and structured.
  - **Whitespace as Luxury**: Generous padding and margins to convey hygiene, clarity, and precision.
  - **High Contrast**: Bold typography against expansive light backgrounds, punctuated by deep navy elements.

---

## 2. Color Palette (Design Tokens)

The colors are mapped to CSS variables to be defined in `src/styles/variables.css`:

```css
:root {
  /* Brand Primary */
  --color-navy: #001838;       /* Deep Navy Blue from Logo (HSL: 214°, 100%, 11%) */
  --color-navy-light: #0d284d; /* Hover / Secondary Navy */
  --color-white: #ffffff;      /* Pure White */

  /* Neutral Backgrounds */
  --color-bg-light: #ffffff;   /* Primary page background */
  --color-bg-soft: #f4f6f9;    /* Alternating section background (Ice Gray) */
  --color-bg-dark: #001838;    /* Dark navy background (for header/footer) */

  /* Typography Colors */
  --color-text-primary: #0f172a;   /* Slate 900 for high-contrast headings */
  --color-text-secondary: #475569; /* Slate 600 for readable body copy */
  --color-text-muted: #94a3b8;     /* Slate 400 for subtext / labels */
  --color-text-on-dark: #ffffff;  /* Text on navy background */

  /* Accents & States */
  --color-accent: #001838;         /* Primary brand color acts as primary action */
  --color-star-silver: #e2e8f0;    /* Muted silver-blue for borders/dividers */
  --color-swiss-red: #d52b1e;      /* Swiss Red (used exclusively for error messages or validation states) */

  /* Border & Shadows */
  --border-hairline: 1px solid rgba(0, 24, 56, 0.1);
  --border-hairline-dark: 1px solid rgba(255, 255, 255, 0.15);
}
```

---

## 3. Typography System

We use a clean, geometric, high-readability sans-serif typeface to match Swiss typographic standards (e.g., **Inter** or **Helvetica Neue**).

* **Header Font Stack**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`
* **Body Font Stack**: `Inter, system-ui, -apple-system, sans-serif`

### Typographic Hierarchy (Scale)

| Token | CSS Size | Mobile Size | Weight | Line Height | Tracking (Letter Spacing) | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-1` | `4.5rem` (72px) | `2.5rem` (40px) | 300 (Light) | 1.1 | `-0.03em` | Hero main heading |
| `h1` | `3.0rem` (48px) | `2.0rem` (32px) | 600 (SemiBold) | 1.2 | `-0.02em` | Section headings |
| `h2` | `2.0rem` (32px) | `1.5rem` (24px) | 500 (Medium) | 1.3 | `-0.01em` | Subsection titles |
| `h3` | `1.25rem` (20px)| `1.15rem` (18px)| 500 (Medium) | 1.4 | `0` | Card headers, labels |
| `body` | `1.0rem` (16px) | `1.0rem` (16px) | 400 (Regular)  | 1.6 | `0` | Body copy |
| `caption` | `0.875rem` (14px)| `0.875rem` (14px)| 500 (Medium) | 1.4 | `0.05em` (Uppercase) | Small labels, badges |

---

## 4. UI Elements & Layout Rules

### Layout Grids
* **Containers**: Maximum width of `1200px` on desktop, aligned center.
* **Margins/Padding**:
  - Desktop: Grid gutters of `32px` (2rem), section padding vertical `120px` (7.5rem).
  - Mobile: Grid gutters of `16px` (1rem), section padding vertical `64px` (4rem).
  - Strict alignment: Align all elements left to emphasize the strong vertical grid line.

### Buttons & Interactive Components
* **Border Radius**: Exact **`4px`** corner radius. A sharp, geometric corner feels precise and clinical; avoid rounded "capsule" shapes.
* **Primary Button**:
  - Background: `var(--color-navy)`
  - Text: `var(--color-white)`
  - Border: `none`
  - Hover State: Background opacity transition to `0.9` or shift to `var(--color-navy-light)`.
* **Secondary Button**:
  - Background: `transparent`
  - Text: `var(--color-navy)`
  - Border: `1px solid var(--color-navy)`
  - Hover State: Background fades to `rgba(0, 24, 56, 0.05)`.
* **Transitions**: Uniform `transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` for all micro-animations.

### Structural Components (Cards & Dividers)
* **Dividers**: Minimalist thin lines (`var(--border-hairline)`) to separate sections instead of heavy background changes.
* **Card Panels**: White background with a hairline border. Avoid heavy, blurry drop shadows. If shadows are used, they must be extremely subtle: `box-shadow: 0 4px 12px rgba(0, 24, 56, 0.02)`.

---

## 5. UI Application Example (CSS)

```css
/* Styling the Hero Section */
.hero {
  background-color: var(--color-bg-light);
  padding: 6rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .hero {
    grid-template-columns: 1fr 1fr;
    padding: 10rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

.hero__title {
  font-family: var(--font-header);
  font-size: var(--size-display-1);
  color: var(--color-text-primary);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-navy);
  color: var(--color-white);
  padding: 1rem 2rem;
  font-weight: 500;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hero__cta:hover {
  background-color: var(--color-navy-light);
}
```
