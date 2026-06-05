import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from '@/config/languages';

/**
 * Locale resources are discovered automatically from `src/locales/*.json`.
 * Adding a language is therefore just: drop in `<code>.json` and register the
 * code in `src/config/languages.ts` — no edits needed here.
 */
const localeModules = import.meta.glob('./locales/*.json', {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>;

const resources: Resource = {};
for (const [path, module] of Object.entries(localeModules)) {
  const code = path.match(/\/([^/]+)\.json$/)?.[1];
  if (code) {
    resources[code] = { translation: module.default };
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: LANGUAGE_CODES,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // React already safe from xss
    },
  });

export default i18n;
