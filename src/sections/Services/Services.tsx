import { useTranslation } from 'react-i18next';
import { SERVICE_KEYS, type ServiceKey } from '@/config/services';
import './Services.css';

interface ServiceCardProps {
  id: ServiceKey;
}

function ServiceCard({ id }: ServiceCardProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="service-card">
      <h3 className="service-card__title">
        {t(`services.categories.${id}.title`)}
      </h3>
      <p className="service-card__desc">
        {t(`services.categories.${id}.desc`)}
      </p>
    </div>
  );
}

export function Services(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>
        <div className="services__grid">
          {SERVICE_KEYS.map((key) => (
            <ServiceCard key={key} id={key} />
          ))}
        </div>
      </div>
    </section>
  );
}
