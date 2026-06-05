import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Menu, X } from 'lucide-react';
import { clinicConfig } from '../../config/clinicConfig';
import { Button } from '../Button/Button';
import logoImg from '../../assets/placeholders/logo.jpeg';
import './Header.css';

interface HeaderProps {
  isDesktop: boolean;
}

export function Header({ isDesktop }: HeaderProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <a href="#/" onClick={closeMobileMenu}>
            <img src={logoImg} alt="SUMADENT" className="header__logo-img" />
          </a>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li><a href="#services">{t('nav.services')}</a></li>
            <li><a href={isDesktop ? '#team' : '#/team'}>{t('nav.team')}</a></li>
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
            <span className="header__cta-text">{t('nav.book_now')}: {clinicConfig.phoneDisplay}</span>
          </Button>

          <button
            className="header__menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav-list">
            <li><a href="#services" onClick={closeMobileMenu}>{t('nav.services')}</a></li>
            <li><a href="#/team" onClick={closeMobileMenu}>{t('nav.team')}</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>{t('nav.contact')}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
