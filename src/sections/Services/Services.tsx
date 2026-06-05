import { useTranslation } from 'react-i18next';
import './Services.css';

interface ServiceCardProps {
  id: string;
}

function ServiceCard({ id }: ServiceCardProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="service-card">
      <h3 className="service-card__title">{t(`services.categories.${id}.title`)}</h3>
      <p className="service-card__desc">{t(`services.categories.${id}.desc`)}</p>
    </div>
  );
}

export function Services(): JSX.Element {
  const { t } = useTranslation();
  const serviceKeys = ['dh', 'aesthetic', 'implants', 'ortho'];

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>
        <div className="services__grid">
          {serviceKeys.map((key) => (
            <ServiceCard key={key} id={key} />
          ))}
        </div>
      </div>
    </section>
  );
}
