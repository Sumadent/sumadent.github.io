import { useTranslation } from 'react-i18next';
import { clinicConfig } from '../../config/clinicConfig';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import './Contact.css';

export function Contact(): JSX.Element {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language as 'de' | 'en' | 'fr' | 'it';
  const hours = clinicConfig.openingHours[currentLang] || clinicConfig.openingHours['de'];
  const transit = clinicConfig.transitNotes[currentLang] || clinicConfig.transitNotes['de'];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact-block">
              <h3 className="contact-block__title">
                <Clock size={20} /> {t('contact.opening_hours')}
              </h3>
              <ul className="contact-block__list">
                {hours.map((h, idx) => {
                  const isClosed = h.hours.toLowerCase().includes('geschlossen') || 
                                   h.hours.toLowerCase().includes('closed') || 
                                   h.hours.toLowerCase().includes('fermé') || 
                                   h.hours.toLowerCase().includes('chiuso');
                  return (
                    <li key={idx} className={isClosed ? 'closed' : ''}>
                      <span className="contact-block__list-day">{h.days}</span>
                      <span className="contact-block__list-hours">{h.hours}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="contact-block">
              <h3 className="contact-block__title">
                <MapPin size={20} /> {t('contact.address')}
              </h3>
              <p>
                {clinicConfig.address.street}<br />
                {clinicConfig.address.zip} {clinicConfig.address.city}
              </p>
              <div className="contact-block__transit">
                <p>{transit.parking}</p>
                <p>{transit.train}</p>
              </div>
            </div>

            <div className="contact-block">
              <h3 className="contact-block__title">Kontakt</h3>
              <p>
                <a href={`tel:${clinicConfig.phoneRaw}`}>
                  <Phone size={16} /> {clinicConfig.phoneDisplay}
                </a><br />
                <a href={`mailto:${clinicConfig.email}`}>
                  <Mail size={16} /> {clinicConfig.email}
                </a>
              </p>
            </div>
          </div>

          <div className="contact__map">
            <iframe
              src={clinicConfig.address.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
