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
  phoneRaw: '+41441234567',
  phoneDisplay: '+41 44 123 45 67',
  email: 'info@sumadent.ch',
  address: {
    street: 'Bahnhofstrasse 12',
    zip: '8001',
    city: 'Zürich',
    canton: 'ZH',
    country: 'Schweiz',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.083838680371!2d8.53765107718919!3d47.37521740410493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08ca9a613d%3A0x2db4abff055f269a!2sBahnhofstrasse%2012%2C%208001%20Z%C3%BCrich!5e0!3m2!1sde!2sch!4v1717590000000!5m2!1sde!2sch',
    googleMapsDirectionUrl: 'https://maps.google.com/?q=Bahnhofstrasse+12,+8001+Zürich',
  },
  openingHours: {
    de: [
      { days: 'Montag - Freitag', hours: '08:00 - 18:00' },
      { days: 'Samstag', hours: '09:00 - 13:00 (Nur nach Vereinbarung)' },
      { days: 'Sonntag', hours: 'Geschlossen' },
    ],
    en: [
      { days: 'Monday - Friday', hours: '08:00 AM - 06:00 PM' },
      { days: 'Saturday', hours: '09:00 AM - 01:00 PM (By appointment only)' },
      { days: 'Sunday', hours: 'Closed' },
    ],
    fr: [
      { days: 'Lundi - Vendredi', hours: '08h00 - 18h00' },
      { days: 'Samedi', hours: '09h00 - 13h00 (Sur rendez-vous uniquement)' },
      { days: 'Dimanche', hours: 'Fermé' },
    ],
    it: [
      { days: 'Lunedì - Venerdì', hours: '08:00 - 18:00' },
      { days: 'Sabato', hours: '09:00 - 13:00 (Solo su appuntamento)' },
      { days: 'Domenica', hours: 'Chiuso' },
    ],
  },
  transitNotes: {
    de: {
      train: '3 Minuten Fussweg vom Hauptbahnhof Zürich (Ausgang Bahnhofstrasse).',
      parking: 'Blaue Zone Parkplätze direkt vor der Praxis vorhanden oder im Parkhaus City.',
    },
    en: {
      train: '3-minute walk from Zurich Main Station (Bahnhofstrasse exit).',
      parking: 'Blue zone parking spaces directly in front of the clinic or at the City parking garage.',
    },
    fr: {
      train: 'À 3 minutes à pied de la gare principale de Zurich (sortie Bahnhofstrasse).',
      parking: 'Places de parking en zone bleue directement devant le cabinet ou au parking City.',
    },
    it: {
      train: 'A 3 minuti a piedi dalla stazione centrale di Zurigo (uscita Bahnhofstrasse).',
      parking: 'Parcheggi in zona blu disponibili direttamente davanti allo studio o presso il parcheggio City.',
    },
  },
};
