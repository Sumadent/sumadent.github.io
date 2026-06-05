import { useTranslation } from 'react-i18next';
import { clinicConfig } from '../../config/clinicConfig';
import './Impressum.css';

export function Impressum(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="impressum section" id="impressum">
      <div className="container">
        <h2 className="section__title">{t('impressum.title', 'Impressum')}</h2>
        
        <div className="impressum__content">
          <div className="impressum__block">
            <h3>{t('impressum.company', 'Name & Adresse')}</h3>
            <p>
              <strong>SUMADENT</strong><br />
              {clinicConfig.address.street}<br />
              {clinicConfig.address.zip} {clinicConfig.address.city}<br />
              {clinicConfig.address.canton}, {clinicConfig.address.country}
            </p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.representative', 'Vertretungsberechtigte Personen')}</h3>
            <p>Sushma Ilg, Dipl. Dentalhygienikerin HF</p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.contact', 'Kontakt')}</h3>
            <p>
              Telefon: <a href={`tel:${clinicConfig.phoneRaw}`}>{clinicConfig.phoneDisplay}</a><br />
              E-Mail: <a href={`mailto:${clinicConfig.email}`}>{clinicConfig.email}</a>
            </p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.disclaimer_title', 'Haftungsausschluss')}</h3>
            <p>{t('impressum.disclaimer_text', 'Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.')}</p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.links_title', 'Haftung für Links')}</h3>
            <p>{t('impressum.links_text', 'Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.')}</p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.copyright_title', 'Urheberrechte')}</h3>
            <p>{t('impressum.copyright_text', 'Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der genannten Firma oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
