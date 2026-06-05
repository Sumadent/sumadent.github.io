import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toLanguageCode } from '@/config/languages';
import { SITE, absoluteUrl } from '@/config/site';
import { buildDentistSchema } from '@/utils/structuredData';

const JSON_LD_ELEMENT_ID = 'ld-json';

/** Create or update a `<meta>` tag in the document head. */
function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Keeps the document head in sync with the active language and the clinic config:
 * the `<html lang>`, title, meta description, Open Graph / Twitter tags and the
 * JSON-LD structured data all update on language change. Renders nothing.
 */
export function Seo(): null {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    const title = t('seo.title');
    const description = t('seo.description');
    const ogTitle = t('seo.og_title', title);
    const ogDescription = t('seo.og_description', description);
    const ogImageUrl = absoluteUrl(SITE.ogImage);

    document.documentElement.lang = toLanguageCode(language);
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', ogTitle);
    upsertMeta('property', 'og:description', ogDescription);
    upsertMeta('property', 'og:image', ogImageUrl);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', SITE.url);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', ogTitle);
    upsertMeta('name', 'twitter:description', ogDescription);
    upsertMeta('name', 'twitter:image', ogImageUrl);

    let script = document.getElementById(
      JSON_LD_ELEMENT_ID,
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = JSON_LD_ELEMENT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildDentistSchema());
  }, [t, language]);

  return null;
}
