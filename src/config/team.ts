import profilePlaceholder from '@/assets/placeholders/userProfilepicture_placholder.jpeg';

/**
 * A member of the clinic team.
 *
 * - `roleKey` points at a translation under `team.roles.*` so the displayed role
 *   is localized.
 * - `schemaJobTitle` is the language-neutral title used in the SEO JSON-LD
 *   `employee[]` (see `src/utils/structuredData.ts`). Keep it in the primary
 *   site language (German).
 * - `image` is the profile picture; swap the placeholder for a real photo import.
 */
export interface TeamMember {
  name: string;
  roleKey: string;
  schemaJobTitle: string;
  image: string;
}

/**
 * Single source of truth for the team.
 *
 * To add a team member, append an object here — the Team section and the SEO
 * structured data both read from this list, so no component changes are needed.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'med. dent. Sven Vanderburg',
    roleKey: 'team.roles.dentist',
    schemaJobTitle: 'Zahnarzt',
    image: profilePlaceholder,
  },
  {
    name: 'Sushma Ilg',
    roleKey: 'team.roles.hygienist',
    schemaJobTitle: 'Dipl. Dentalhygienikerin HF',
    image: profilePlaceholder,
  },
  {
    name: 'Valentina Dula',
    roleKey: 'team.roles.assistant',
    schemaJobTitle: 'Dentalassistentin',
    image: profilePlaceholder,
  },
];
