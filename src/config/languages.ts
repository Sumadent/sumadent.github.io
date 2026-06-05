/**
 * Single source of truth for the languages the site supports.
 *
 * To add a language:
 *   1. Create `src/locales/<code>.json` (copy an existing file and translate it).
 *   2. Add one entry to `SUPPORTED_LANGUAGES` below.
 *      `clinicConfig` opening hours / transit notes, the i18n setup, and the
 *      header language switcher all derive from this list automatically.
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
] as const;

/** Union of supported language codes, e.g. `'de' | 'en' | 'fr' | 'it'`. */
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

/** Plain list of codes, handy for i18n config and runtime guards. */
export const LANGUAGE_CODES: LanguageCode[] = SUPPORTED_LANGUAGES.map(
  (language) => language.code,
);

/** Language used as fallback and for language-neutral (SEO) content. */
export const DEFAULT_LANGUAGE: LanguageCode = 'de';

/** Type guard: is the given string one of our supported language codes? */
export function isLanguageCode(value: string): value is LanguageCode {
  return (LANGUAGE_CODES as string[]).includes(value);
}

/** Narrow any i18n language string to a supported code (falls back to default). */
export function toLanguageCode(value: string): LanguageCode {
  return isLanguageCode(value) ? value : DEFAULT_LANGUAGE;
}
