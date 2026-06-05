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
  openingHours: {
    [lang in 'de' | 'en' | 'fr' | 'it']: Array<{
      days: string;
      hours: string;
    }>;
  };
  transitNotes: {
    [lang in 'de' | 'en' | 'fr' | 'it']: {
      train: string;
      parking: string;
    };
  };
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
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Schulhausstrasse%206,%208872%20Weesen&t=&z=16&ie=UTF8&iwloc=&output=embed',
    googleMapsDirectionUrl: 'https://maps.google.com/?q=Schulhausstrasse+6,+8872+Weesen',
  },
  openingHours: {
    de: [
      { days: 'Montag & Donnerstag', hours: '07:30 - 16:00' },
      { days: 'Dienstag', hours: '07:30 - 12:00' },
      { days: 'Mittwoch, Freitag & Sonntag', hours: 'Geschlossen' },
      { days: 'Letzter Sa. im Monat', hours: '08:00 - 13:00' },
    ],
    en: [
      { days: 'Monday & Thursday', hours: '07:30 AM - 04:00 PM' },
      { days: 'Tuesday', hours: '07:30 AM - 12:00 PM' },
      { days: 'Wednesday, Friday & Sunday', hours: 'Closed' },
      { days: 'Last Sat. of the month', hours: '08:00 AM - 01:00 PM' },
    ],
    fr: [
      { days: 'Lundi & Jeudi', hours: '07h30 - 16h00' },
      { days: 'Mardi', hours: '07h30 - 12h00' },
      { days: 'Mercredi, Vendredi & Dimanche', hours: 'Fermé' },
      { days: 'Dernier sam. du mois', hours: '08h00 - 13h00' },
    ],
    it: [
      { days: 'Lunedì & Giovedì', hours: '07:30 - 16:00' },
      { days: 'Martedì', hours: '07:30 - 12:00' },
      { days: 'Mercoledì, Venerdì & Domenica', hours: 'Chiuso' },
      { days: 'Ultimo sab. del mese', hours: '08:00 - 13:00' },
    ],
  },
  transitNotes: {
    de: {
      parking: 'Gratis Parkplätze vor der Praxis.',
      train: 'ÖV: Busverbindung ab Bahnhof Ziegelbrücke (Bus 650 bis Haltestelle Weesen, Post, danach 5 Minuten Fussweg)',
    },
    en: {
      parking: 'Free parking spaces in front of the clinic.',
      train: 'Public Transport: Bus connection from Ziegelbrücke train station (Bus 650 to Weesen, Post stop, then a 5-minute walk)',
    },
    fr: {
      parking: 'Places de parking gratuites devant le cabinet.',
      train: 'Transports publics: Liaison en bus depuis la gare de Ziegelbrücke (Bus 650 jusqu\'à l\'arrêt Weesen, Post, puis 5 minutes à pied)',
    },
    it: {
      parking: 'Parcheggi gratuiti davanti allo studio.',
      train: 'Trasporti pubblici: Collegamento in autobus dalla stazione di Ziegelbrücke (Bus 650 fino alla fermata Weesen, Post, poi 5 minuti a piedi)',
    },
  },
};
