import { useTranslation } from 'react-i18next';
import { TEAM_MEMBERS } from '@/config/team';
import './Team.css';

export function Team(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section id="team" className="section team">
      <div className="container">
        <h2 className="section-title">{t('team.title')}</h2>
        <p className="team__subtitle">{t('team.subtitle')}</p>

        <div className="team__grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="team-member">
              <div className="team-member__image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member__image"
                />
              </div>
              <h3 className="team-member__name">{member.name}</h3>
              <p className="team-member__role">{t(member.roleKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
