import { useTranslation } from 'react-i18next';
import './Team.css';

export function Team(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section id="team" className="section team">
      <div className="container">
        <h2 className="section-title">{t('team.title')}</h2>
        <p className="team__subtitle">{t('team.subtitle')}</p>
        
        <div className="team__grid">
          <div className="team-member">
            <div className="team-member__image-placeholder"></div>
            <h3 className="team-member__name">Dr. med. dent. Placeholder</h3>
            <p className="team-member__role">Zahnarzt (SSO)</p>
          </div>
          <div className="team-member">
            <div className="team-member__image-placeholder"></div>
            <h3 className="team-member__name">Anna Muster</h3>
            <p className="team-member__role">Dipl. Dentalhygienikerin HF</p>
          </div>
        </div>
      </div>
    </section>
  );
}
