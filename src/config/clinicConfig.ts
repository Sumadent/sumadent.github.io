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
  /**
   * ZaWin "Online-Agenda" booking widget URL (e.g. `https://webtermin.zawin.ch/...`).
   *
   * Empty until the clinic activates the module and ZaWin support (Martin
   * Engineering AG) provides the link — see `brainstorm/zawin_integration_todo.md`.
   * While empty, the booking page shows an "integration pending" placeholder
   * instead of the embedded widget. When set, appointments booked through it
   * sync directly into the clinic's local ZaWin calendar.
   */
  zawinBookingUrl: string;
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
  // TODO(zawin): paste the Web-Widget URL from ZaWin support here to go live.
  zawinBookingUrl: '',
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
      { days: 'Montag & Donnerstag', hours: '07:30 - 16:00' },
      { days: 'Dienstag', hours: '07:30 - 12:00' },
      {
        days: 'Mittwoch, Freitag & Sonntag',
        hours: 'Geschlossen',
        closed: true,
      },
      { days: 'Letzter Sa. im Monat', hours: '08:00 - 13:00' },
    ],
    en: [
      { days: 'Monday & Thursday', hours: '07:30 AM - 04:00 PM' },
      { days: 'Tuesday', hours: '07:30 AM - 12:00 PM' },
      { days: 'Wednesday, Friday & Sunday', hours: 'Closed', closed: true },
      { days: 'Last Sat. of the month', hours: '08:00 AM - 01:00 PM' },
    ],
    fr: [
      { days: 'Lundi & Jeudi', hours: '07h30 - 16h00' },
      { days: 'Mardi', hours: '07h30 - 12h00' },
      { days: 'Mercredi, Vendredi & Dimanche', hours: 'Fermé', closed: true },
      { days: 'Dernier sam. du mois', hours: '08h00 - 13h00' },
    ],
    it: [
      { days: 'Lunedì & Giovedì', hours: '07:30 - 16:00' },
      { days: 'Martedì', hours: '07:30 - 12:00' },
      { days: 'Mercoledì, Venerdì & Domenica', hours: 'Chiuso', closed: true },
      { days: 'Ultimo sab. del mese', hours: '08:00 - 13:00' },
    ],
  },
  openingHoursStructured: [
    { days: ['Monday', 'Thursday'], opens: '07:30', closes: '16:00' },
    { days: ['Tuesday'], opens: '07:30', closes: '12:00' },
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
