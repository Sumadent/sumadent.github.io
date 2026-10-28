import type { LanguageCode } from '@/config/languages';

/** One localized opening-hours row as shown in the UI. */
export interface OpeningHoursRow {
  days: string;
  hours: string;
  /** Marks a "closed" row so the UI can style it without parsing the text. */
  closed?: boolean;
}

/**
 * One machine-readable opening-hours rule for SEO structured data
 * (schema.org `OpeningHoursSpecification`). Day names are English schema.org
 * values; times are 24h `HH:MM`. Language-neutral on purpose.
 */
export interface OpeningHoursRule {
  days: string[];
  opens: string;
  closes: string;
}

export interface ClinicContactInfo {
  phoneRaw: string; // E.164 format for tel: links (e.g. +41441234567)
  phoneDisplay: string; // Formatted for UI display (e.g. +41 44 123 45 67)
  email: string;
  address: {
    street: string;
    zip: string;
    city: string;
    canton: string;
    country: string;
    googleMapsEmbedUrl: string; // URL for maps iframe
    googleMapsDirectionUrl: string; // URL for google maps redirection
  };
  /** Localized opening-hours rows for display, keyed by language. */
  openingHours: Record<LanguageCode, OpeningHoursRow[]>;
  /** Language-neutral opening hours for SEO structured data. */
  openingHoursStructured: OpeningHoursRule[];
  transitNotes: Record<
    LanguageCode,
    {
      train: string;
      parking: string;
    }
  >;
}

export const clinicConfig: ClinicContactInfo = {
  phoneRaw: '+41556161043',
  phoneDisplay: '+41 55 616 10 43',
  email: 'info@sumadent.ch',
  address: {
    street: 'Schulhausstrasse 6',
    zip: '8872',
    city: 'Weesen',
    canton: 'SG',
    country: 'Schweiz',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=Schulhausstrasse%206,%208872%20Weesen&t=&z=16&ie=UTF8&iwloc=&output=embed',
    googleMapsDirectionUrl:
      'https://maps.google.com/?q=Schulhausstrasse+6,+8872+Weesen',
  },
  openingHours: {
    de: [
      { days: 'Montag - Freitag', hours: '08:00 - 17:00' },
      { days: 'Letzter Sa. im Monat', hours: '08:00 - 13:00' },
      { days: 'Sonntag', hours: 'Geschlossen', closed: true },
    ],
    en: [
      { days: 'Monday - Friday', hours: '08:00 AM - 05:00 PM' },
      { days: 'Last Sat. of the month', hours: '08:00 AM - 01:00 PM' },
      { days: 'Sunday', hours: 'Closed', closed: true },
    ],
    fr: [
      { days: 'Lundi - Vendredi', hours: '08h00 - 17h00' },
      { days: 'Dernier sam. du mois', hours: '08h00 - 13h00' },
      { days: 'Dimanche', hours: 'Fermé', closed: true },
    ],
    it: [
      { days: 'Lunedì - Venerdì', hours: '08:00 - 17:00' },
      { days: 'Ultimo sab. del mese', hours: '08:00 - 13:00' },
      { days: 'Domenica', hours: 'Chiuso', closed: true },
    ],
  },
  openingHoursStructured: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  transitNotes: {
    de: {
      parking: 'Gratis Parkplätze vor der Praxis.',
      train:
        'ÖV: Busverbindung ab Bahnhof Ziegelbrücke (Bus 650 bis Haltestelle Weesen, Post, danach 5 Minuten Fussweg)',
    },
    en: {
      parking: 'Free parking spaces in front of the clinic.',
      train:
        'Public Transport: Bus connection from Ziegelbrücke train station (Bus 650 to Weesen, Post stop, then a 5-minute walk)',
    },
    fr: {
      parking: 'Places de parking gratuites devant le cabinet.',
      train:
        "Transports publics: Liaison en bus depuis la gare de Ziegelbrücke (Bus 650 jusqu'à l'arrêt Weesen, Post, puis 5 minutes à pied)",
    },
    it: {
      parking: 'Parcheggi gratuiti davanti allo studio.',
      train:
        'Trasporti pubblici: Collegamento in autobus dalla stazione di Ziegelbrücke (Bus 650 fino alla fermata Weesen, Post, poi 5 minuti a piedi)',
    },
  },
};
