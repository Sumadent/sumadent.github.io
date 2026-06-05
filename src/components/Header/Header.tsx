import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { Button } from '../Button/Button';
import './Header.css';

export function Header(): JSX.Element {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <a href="/">SUMADENT</a>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li><a href="#services">{t('nav.services')}</a></li>
            <li><a href="#team">{t('nav.team')}</a></li>
            <li><a href="#contact">{t('nav.contact')}</a></li>
          </ul>
        </nav>

        <div className="header__actions">
          <div className="header__lang-switcher">
            {['de', 'en', 'fr', 'it'].map((lng) => (
              <button
                key={lng}
                className={`header__lang-btn ${i18n.language === lng ? 'active' : ''}`}
                onClick={() => changeLanguage(lng)}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
          
          <Button
            as="a"
            href={`tel:${clinicConfig.phoneRaw}`}
            variant="primary"
            className="header__cta"
          >
            <Phone size={18} className="header__cta-icon" />
            <span className="header__cta-text">{t('nav.book_now')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
