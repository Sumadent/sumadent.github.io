import { useTranslation } from 'react-i18next';
import { clinicConfig } from '@/config/clinicConfig';
import { SITE } from '@/config/site';
import './Impressum.css';

export function Impressum(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="impressum section" id="impressum">
      <div className="container">
        <h2 className="section__title">{t('impressum.title')}</h2>

        <div className="impressum__content">
          <div className="impressum__block">
            <h3>{t('impressum.company')}</h3>
            <p>
              <strong>{SITE.brandName}</strong>
              <br />
              {clinicConfig.address.street}
              <br />
              {clinicConfig.address.zip} {clinicConfig.address.city}
              <br />
              {clinicConfig.address.canton}, {clinicConfig.address.country}
            </p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.representative')}</h3>
            <p>{t('impressum.representative_value')}</p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.contact')}</h3>
            <p>
              {t('impressum.phone_label')}:{' '}
              <a href={`tel:${clinicConfig.phoneRaw}`}>
                {clinicConfig.phoneDisplay}
              </a>
              <br />
              {t('impressum.email_label')}:{' '}
              <a href={`mailto:${clinicConfig.email}`}>{clinicConfig.email}</a>
            </p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.disclaimer_title')}</h3>
            <p>{t('impressum.disclaimer_text')}</p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.links_title')}</h3>
            <p>{t('impressum.links_text')}</p>
          </div>

          <div className="impressum__block">
            <h3>{t('impressum.copyright_title')}</h3>
            <p>{t('impressum.copyright_text')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
