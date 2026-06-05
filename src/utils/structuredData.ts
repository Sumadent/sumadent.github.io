import { clinicConfig } from '@/config/clinicConfig';
import { TEAM_MEMBERS } from '@/config/team';
import { SITE, absoluteUrl } from '@/config/site';

/**
 * Builds the schema.org `Dentist` JSON-LD object from the same config the UI
 * renders, so the structured data can never drift from what visitors see.
 * Consumed by the `<Seo>` component.
 */
export function buildDentistSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: SITE.brandName,
    image: absoluteUrl(SITE.logo),
    telephone: clinicConfig.phoneDisplay,
    email: clinicConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinicConfig.address.street,
      addressLocality: clinicConfig.address.city,
      postalCode: clinicConfig.address.zip,
      addressRegion: clinicConfig.address.canton,
      addressCountry: 'CH',
    },
    openingHoursSpecification: clinicConfig.openingHoursStructured.map(
      (rule) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: rule.days,
        opens: rule.opens,
        closes: rule.closes,
      }),
    ),
    employee: TEAM_MEMBERS.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.schemaJobTitle,
    })),
  };
}
