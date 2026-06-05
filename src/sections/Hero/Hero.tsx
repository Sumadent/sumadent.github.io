import { useTranslation } from 'react-i18next';
import { Phone, ShieldCheck } from 'lucide-react';
import { clinicConfig } from '@/config/clinicConfig';
import { Button } from '@/components/Button/Button';
import landingImg from '@/assets/placeholders/placeHolderLandingImage.jpeg';
import './Hero.css';

export function Hero(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero__image-wrapper">
        <img src={landingImg} alt="Sumadent Clinic" className="hero__image" />
      </div>
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__badge-wrapper">
            <span className="hero__badge">
              <ShieldCheck size={16} className="hero__badge-icon" />
              {t('hero.badge_sso')}
            </span>
          </div>

          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>

          <div className="hero__actions">
            <Button
              as="a"
              href={`tel:${clinicConfig.phoneRaw}`}
              variant="primary"
              className="hero__cta"
            >
              <Phone size={20} className="hero__cta-icon" />
              {t('hero.cta')}: {clinicConfig.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
