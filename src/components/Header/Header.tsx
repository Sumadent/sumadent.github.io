import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarCheck, Menu, X } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/config/languages';
import { NAV_ITEMS, BOOKING_ROUTE } from '@/config/navigation';
import { SITE } from '@/config/site';
import { Button } from '@/components/Button/Button';
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
            <img
              src={SITE.logo}
              alt={SITE.brandName}
              className="header__logo-img"
            />
          </a>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.labelKey}>
                <a href={isDesktop ? item.desktopHref : item.mobileHref}>
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <div className="header__lang-switcher">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`header__lang-btn ${i18n.language === language.code ? 'active' : ''}`}
                onClick={() => changeLanguage(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>

          <Button
            as="a"
            href={BOOKING_ROUTE}
            variant="primary"
            className="header__cta"
          >
            <CalendarCheck size={18} className="header__cta-icon" />
            <span className="header__cta-text">{t('nav.book_now')}</span>
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
            {NAV_ITEMS.map((item) => (
              <li key={item.labelKey}>
                <a href={item.mobileHref} onClick={closeMobileMenu}>
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
