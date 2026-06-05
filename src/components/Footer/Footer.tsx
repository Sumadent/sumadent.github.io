import { useTranslation } from 'react-i18next';
import { clinicConfig } from '@/config/clinicConfig';
import { SITE } from '@/config/site';
import './Footer.css';

export function Footer(): JSX.Element {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__col">
          <img
            src={SITE.logo}
            alt={SITE.brandName}
            className="footer__logo-img"
          />
          <p className="footer__text">{t('hero.subtitle')}</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">{t('contact.title')}</h3>
          <p className="footer__text">
            {SITE.legalName}
            <br />
            {clinicConfig.address.street}
            <br />
            {clinicConfig.address.zip} {clinicConfig.address.city}
          </p>
          <p className="footer__text">
            <a href={`tel:${clinicConfig.phoneRaw}`}>
              {clinicConfig.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${clinicConfig.email}`}>{clinicConfig.email}</a>
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy; {currentYear} {SITE.brandName}. {t('footer.rights')}
          </p>
          <a href="#/impressum" className="footer__link">
            {t('impressum.title')}
          </a>
        </div>
      </div>
    </footer>
  );
}
