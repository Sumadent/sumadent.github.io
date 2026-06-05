import { useTranslation } from 'react-i18next';
import profilePlaceholder from '../../assets/placeholders/userProfilepicture_placholder.jpeg';
import './Team.css';

interface TeamMember {
  name: string;
  roleKey: string;
}

export function Team(): JSX.Element {
  const { t } = useTranslation();

  const members: TeamMember[] = [
    {
      name: 'med. dent. Sven Vanderburg',
      roleKey: 'team.roles.dentist',
    },
    {
      name: 'Sushma Ilg',
      roleKey: 'team.roles.hygienist',
    },
    {
      name: 'Valentina Dula',
      roleKey: 'team.roles.assistant',
    },
  ];

  return (
    <section id="team" className="section team">
      <div className="container">
        <h2 className="section-title">{t('team.title')}</h2>
        <p className="team__subtitle">{t('team.subtitle')}</p>
        
        <div className="team__grid">
          {members.map((member, idx) => (
            <div key={idx} className="team-member">
              <div className="team-member__image-wrapper">
                <img
                  src={profilePlaceholder}
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
