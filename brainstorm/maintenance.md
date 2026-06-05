# Site Maintenance & Configuration Guide

This guide details how to manage the build assets, handle copyright/licensing safety, and add or update team members on the SumaDent website.

---

## 1. Built Assets and Deployment

When you build the project for deployment (using `npm run build`), Vite compiles, optimizes, and minifies the source files from the `src/` directory into static assets in the `dist/` directory.

### Production Bundles
* **CSS Bundle (`dist/assets/index-[hash].css`):**
  A single stylesheet containing all global styles, design system tokens (colors, fonts, sizes), layout grids, and responsive media queries.
* **JavaScript Bundle (`dist/assets/index-[hash].js`):**
  The compiled logic containing the React framework runtime, third-party libraries (like `i18next` for translations and `lucide-react` for icons), routing logic, and all page components.

### Copyright & Asset Safety Checklist
Before releasing the website to a live public server, you must swap out or verify the copyright status of placeholder assets in the `src/assets/placeholders/` directory:

1. **Staff Profile Pictures (`userProfilepicture_placholder.jpeg`):**
   * Swap this placeholder for actual headshots of Sven, Sushma, and Valentina.
2. **Hero/Landing Image (`placeHolderLandingImage.jpeg`):**
   * Swap this for a photo of the clinic interior/exterior, or a royalty-free stock image (e.g., from Unsplash, Pexels) licensed for free commercial use.
3. **Fonts & Icons (OFL & ISC Licensed):**
   * The *Inter* font and *Lucide* icons are licensed under free, open-source licenses (SIL OFL and ISC/MIT) and are safe for commercial use.

---

## 2. Managing Team Members

Adding, editing, or removing a team member does not require writing HTML or CSS. The layout and search engine (SEO) metadata are automatically generated based on a single configuration file and translation dictionaries.

### Step-by-Step: Adding a Team Member

### 1. Add the Member to the Config
Open the team configuration file at `src/config/team.ts` and add a new entry to the `TEAM_MEMBERS` array:

```typescript
{
  name: 'Dr. med. dent. Jane Doe',
  roleKey: 'team.roles.dentist_specialist', // Translation key for their job title
  schemaJobTitle: 'Fachzahnärztin',         // Search engine metadata (in German)
  image: profilePlaceholder,                // Profile picture import
}
```

### 2. Define the Localized Role Titles
Open the translation files under `src/locales/` and add the matching job title translation under `team.roles` in each supported language file:

#### **German (`src/locales/de.json`)**
```json
"team": {
  "title": "Unser Team",
  "subtitle": "Kompetenz und Einfühlungsvermögen für Ihre Zahngesundheit.",
  "roles": {
    "dentist": "Zahnarzt (SSO)",
    "hygienist": "Dipl. Dentalhygienikerin HF",
    "assistant": "Dentalassistentin",
    "dentist_specialist": "Fachzahnärztin für Kieferorthopädie"
  }
}
```

#### **English (`src/locales/en.json`)**
```json
"team": {
  "title": "Our Team",
  "subtitle": "Competence and empathy for your dental health.",
  "roles": {
    "dentist": "Dentist (SSO)",
    "hygienist": "Registered Dental Hygienist",
    "assistant": "Dental Assistant",
    "dentist_specialist": "Specialist Dentist in Orthodontics"
  }
}
```

*(Repeat for `fr.json` and `it.json` if those translations are active).*

### 3. Add their Profile Photo
To use a custom photo instead of the placeholder:
1. Place their image (recommended format: `.webp`, cropped to a 3:4 aspect ratio) in `src/assets/`.
2. Import it at the top of `src/config/team.ts`:
   ```typescript
   import janeDoePhoto from '@/assets/jane-doe.webp';
   ```
3. Set the imported variable as the value of the `image` field:
   ```typescript
   image: janeDoePhoto,
   ```

---

## 3. Rebuilding the Site
Whenever you make updates to the team configuration or translations:
1. Open your terminal in the project directory.
2. Run:
   ```bash
   npm run build
   ```
3. Deploy the updated `dist/` directory to your web server.
