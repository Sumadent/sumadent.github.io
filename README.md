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
* **SEO Consistency**: The JSON-LD schema (local business/dentist structured data) and metadata in the HTML pull from this exact configuration file, guaranteeing Google sees identical information to what is rendered on screen.
* **Structured Data**: This file contains localized properties for transit instructions, addresses, and hours to support all 4 national/expat languages.

---

## 3. Directory Structure

```text
sumadent/
├── brainstorm/             # Brainstorming & architectural planning files
├── public/                 # Static assets (favicons, manifest, etc.)
├── src/
│   ├── assets/             # SVG icons, images, and clinic illustration assets
│   ├── config/
│   │   └── clinicConfig.ts # Centralized contact and hours configuration file
│   ├── components/         # Reusable presentation components (Buttons, Modals)
│   ├── sections/           # Landing page modules (Hero, Services, Contact)
│   │   ├── Hero/
│   │   ├── Services/
│   │   └── Contact/
│   ├── locales/            # JSON translation dictionary files (de/en/fr/it)
│   ├── styles/             # CSS Variables (design tokens) and global reset styles
│   ├── utils/              # Helper utilities
│   ├── App.tsx             # Main layout & section orchestration
│   └── main.tsx            # React mounting shell
```

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
