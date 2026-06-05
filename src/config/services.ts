/**
 * Single source of truth for the services shown in the Services section.
 *
 * Each key maps to translations under `services.categories.<key>.{title,desc}`
 * in every locale file. To add a service:
 *   1. Append its key here.
 *   2. Add `services.categories.<key>.title` / `.desc` to each `src/locales/*.json`.
 * The Services section renders one card per key automatically.
 */
export const SERVICE_KEYS = [
  'dh',
  'general',
  'prosthetics',
  'aesthetic',
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];
